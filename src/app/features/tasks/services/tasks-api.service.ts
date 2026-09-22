import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { API_PATHS } from '@shared/constants/api-paths.constants';
import { ApiResponse } from '@shared/models/api-response.model';
import { environment } from '../../../../environments/environment';

import {
  ChangeTaskStatusRequest,
  CreateTaskRequest,
  GetTasksByUserParams,
  GetTasksParams,
  Task,
  UpdateTaskAdditionalInfoRequest,
} from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TasksApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/${API_PATHS.tasks}`;

  getTasks(params: GetTasksParams = {}): Observable<Task[]> {
    let httpParams = new HttpParams();
    if (params.orderBy) {
      httpParams = httpParams.set('orderBy', params.orderBy);
    }
    if (params.priority) {
      httpParams = httpParams.set('priority', params.priority);
    }

    return this.http
      .get<ApiResponse<Task[]>>(this.baseUrl, { params: httpParams })
      .pipe(map((res) => res.data ?? []));
  }

  getTasksByUser(params: GetTasksByUserParams): Observable<Task[]> {
    let httpParams = new HttpParams();
    if (params.status) {
      httpParams = httpParams.set('status', params.status);
    }
    if (params.orderBy) {
      httpParams = httpParams.set('orderBy', params.orderBy);
    }
    if (params.priority) {
      httpParams = httpParams.set('priority', params.priority);
    }

    return this.http
      .get<ApiResponse<Task[]>>(`${this.baseUrl}/user/${params.userId}`, {
        params: httpParams,
      })
      .pipe(map((res) => res.data ?? []));
  }

  createTask(body: CreateTaskRequest): Observable<Task> {
    return this.http
      .post<ApiResponse<Task>>(this.baseUrl, body)
      .pipe(map((res) => res.data!));
  }

  changeStatus(id: number, body: ChangeTaskStatusRequest): Observable<Task> {
    return this.http
      .put<ApiResponse<Task>>(`${this.baseUrl}/${id}/status`, body)
      .pipe(map((res) => res.data!));
  }

  updateAdditionalInfo(
    id: number,
    body: UpdateTaskAdditionalInfoRequest,
  ): Observable<Task> {
    return this.http
      .patch<ApiResponse<Task>>(`${this.baseUrl}/${id}/additional-info`, body)
      .pipe(map((res) => res.data!));
  }
}
