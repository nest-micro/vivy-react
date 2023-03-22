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

  interface DictInfo {
    label: string;
    value: string;
    cssClass: string;
    dictCode: number;
    dictLabel: string;
    dictValue: string;
    dictSort: number;
    dictType: 'sys_normal_disable' | 'sys_common_status' | 'sys_yes_no' | 'sys_oper_type';
    listClass: string;
    remark: string;
    status: string;
  }
}
