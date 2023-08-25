export class SwalModel {
    public static getRequest(templateName: string, data: any, languageCode: string, recipe = 'chrome-pdf'): any {
        return {
            "template": {
                "name": templateName,
                "recipe": recipe
            },
            "data": data,
            "options": {
                "language": languageCode
            }
        };
    }
}