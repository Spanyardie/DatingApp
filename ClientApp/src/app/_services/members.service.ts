import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { Member } from '../_models/member';
import { PaginatedResult } from '../_models/pagination';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer' + JSON.parse(localStorage.getItem('user'))?.token
  })
}

@Injectable({
  providedIn: 'root'
})

export class MembersService {
  basUrl = environment.apiUrl;
  members: Member[] = [];
  paginatedResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>();

  constructor(private http: HttpClient) { }

  getMembers(page?: number, itemsPerPage?: number) {
    //if (this.members.length > 0) {
    //  return of(this.members);
    //}
    let params = new HttpParams();

    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }
    return this.http.get<Member[]>(this.basUrl + 'users', {observe: 'response', params}).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;
      })
    );
    
  }

  getmember(username) {
    const member = this.members.find(x => x.username === username);
    if (member !== undefined) return of(member);

    return this.http.get<Member>(this.basUrl + 'users/' + username);
  }

  updateMember(member: Member) {
    return this.http.put(this.basUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.basUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: Number) {
    return this.http.delete(this.basUrl + 'users/delete-photo/' + photoId);
  }
}
