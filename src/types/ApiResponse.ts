export type ApiResponse<T> = {
  status: number;
  statusText: string;
  data: T;
};

export type SignUpResponse =
  | {
      description: string;
      errorCode: string;
    }
  | {
      accessToken: string;
      homelessId: number;
    };
