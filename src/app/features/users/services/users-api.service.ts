import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { API_PATHS } from '@shared/constants/api-paths.constants';
import { ApiResponse } from '@shared/models/api-response.model';
import { environment } from '../../../../environments/environment';

import { CreateUserRequest, User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/${API_PATHS.users}`;

  getUsers(): Observable<User[]> {
    return this.http
      .get<ApiResponse<User[]>>(this.baseUrl)
      .pipe(map((res) => res.data ?? []));
  }

  createUser(body: CreateUserRequest): Observable<User> {
    return this.http
      .post<ApiResponse<User>>(this.baseUrl, body)
      .pipe(map((res) => res.data!));
  }
}
