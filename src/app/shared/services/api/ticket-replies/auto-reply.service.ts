import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AutoReplyService {

  endpoint = environment.baseURL;
  constructor(private http: HttpClient) { 
  }
  public getReply(page){ 
    return this.http.get(this.endpoint+"/reply-templates?page="+page);
  }
  public delete(id){ 
    return this.http.delete(this.endpoint+"/reply-templates/"+id);
  }
  public get(id){ 
    return this.http.get(this.endpoint+"/reply-templates/"+id);
  }
  public edit(id,reply){ 
    return this.http.put(this.endpoint+"/reply-templates/"+id,reply);
  }
  public add(reply){ 
    return this.http.post(this.endpoint+"/reply-templates",reply);
  }
  public getWithValue(ticketId,replyId){ 
    return this.http.get(this.endpoint+"/reply-templates/with/values?ticket_id="+ticketId+"&reply_template_id="+replyId);
  }

}
