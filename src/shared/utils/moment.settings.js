import moment from "moment";

export const DateFormatType = {
    M3_D2_CM_Y4: 'MMM DD, YYYY',
    D2_M3_Y4_CM_h2_m2_A: 'DD MMM YYYY, hh:mm A',
    Y4_FS_M2_FS_D2: 'YYYY/MM/DD',
    D2_FS_M2_FS_Y4: 'DD/MM/YYYY',
    Y4_DH_M2_DH_D2: 'YYYY-MM-DD',
    d2_FS_m2_FS_y2: 'dd/mm/yy',
    d2_FS_m2_FS_y4: 'dd/mm/yyyy',
    M1: 'M',
    Y1: 'Y'
};

export function convertDateISOToMoment(fieldKeys = []) {
    return (item) => {
        fieldKeys.forEach(key => {
            if (item && item[key]) {
                item[key] = moment(item[key]);
            }
        });

        return item;
    };
}
