export type SignUpResponse =
  | {
      description: string;
      errorCode: string;
    }
  | {
      accessToken: string;
      homelessId: number;
    };
