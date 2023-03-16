declare namespace API {
  interface Indexable {
    [key: string]: any;
  }

  interface UserInfo {
    roles: string[];
    permissions: string[];
    user: {
      userId: number;
      userName: string;
      nickName: string;
      phonenumber: string;
      email: string;
      avatar: string;
      deptId: string;
      deptName: string;
      sex: string;
      createTime: string;
      dept: API.Indexable;
      roles: API.Indexable[];
    };
  }
}
