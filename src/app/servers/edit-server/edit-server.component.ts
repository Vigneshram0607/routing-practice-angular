import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit: boolean = true;
  changesSaved:boolean = false;

  constructor(private serversService: ServersService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id  = +this.activatedRoute.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    console.log('this.serversService.getServer(id): ', this.serversService.getServer(id))
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
    console.log('snapshot - queryParams: ',this.activatedRoute.snapshot.queryParams);
    console.log('snapshot - fragment: ',this.activatedRoute.snapshot.fragment);
    this.activatedRoute.queryParams.subscribe((queryParams: Params)=>{
      console.log('ALLOW EDIT QUERY PARAMS: ',queryParams['allowEdit'])
      this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
    })
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'],{relativeTo: this.activatedRoute});
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(!this.allowEdit){
      return true;
    }

    if((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved){
      return confirm('Do you want to discard the changes?');
    }else{
      return true;
    }
  }

}
