export type RoleType = {
    id: string;
    nameRole: string;
    description: string;
    userManage: {
        nguoidung_phanquyen: boolean;
        nguoidung_tao: boolean;
        nguoidung_capnhat: boolean;
        denguoidung_xoalete: boolean;
        nguoidung_xemchitiet: boolean;
    }
    libraryManage: {
        nguoidung_xemdanhsach: boolean;
        nguoidung_tailentep: boolean;
        nguoidung_chinhsua: boolean;
        nguoidung_xoa: boolean;
        nguoidung_pheduyet: boolean;
    }
    rowkey: []
}