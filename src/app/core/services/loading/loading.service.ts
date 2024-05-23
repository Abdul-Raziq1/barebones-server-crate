import { Injectable, Signal, signal } from '@angular/core';
import { LoadingState } from '../../../shared/shared.types';
import { getErrorMessage } from '../../util/util';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loadingState = signal<LoadingState>({
    isLoading: false,
    error: '',
    successMessage: '',
  });

  constructor() { }

  loadingState: Signal<LoadingState> = this._loadingState.asReadonly();

  setLoadingToTrue() {
    this._loadingState.update((state) => ({ ...state, isLoading: true }));
  }

  setLoadingToFalse() {
    this._loadingState.update((state) => ({ ...state, isLoading: false }));
  }

  resetError() {
    this._loadingState.update((state) => ({ ...state, error: '' }));
  }

  resetSuccessMessage() {
    this._loadingState.update((state) => ({ ...state, successMessage: '' }));
  }

  updateSuccessMessage(message: string) {
    this._loadingState.update((state) => ({
      ...state,
      successMessage: message,
    }));
  }

  updateErrorMessageByError(error: any) {
    const errorMessage = getErrorMessage(error);
    this._loadingState.update((state) => ({
      ...state,
      error: errorMessage,
    }));
  }
}
