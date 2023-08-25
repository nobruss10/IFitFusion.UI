export abstract class DateHelper {
    static formatDateEuaToBr(date?: string) : string {
        const dia = date?.split('-')[2];
        const mes = date?.split('-')[1];
        const ano = date?.split('-')[0];

        return `${dia}/${mes}/${ano}`;
    }

    static formatDateEuaToDateTime(date?: string) : Date {
        const dia = date?.split('-')[2];
        const mes = date?.split('-')[1];
        const ano = date?.split('-')[0];

        return new Date(`${ano}/${mes}/${dia}`);
    }
}