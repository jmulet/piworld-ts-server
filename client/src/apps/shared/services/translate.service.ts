import { Injectable } from "@angular/core";
import { pwCore } from "../../admin/pw-core";

@Injectable()
export class TranslateService {

    lang: any;
    constructor(){
        this.lang = pwCore.Lang;
    }

    getCalendarLocale(){
        let calLocale;

        if (this.lang==="ca") {
            calLocale = {
                firstDayOfWeek: 1,
                dayNames: ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"],
                dayNamesShort: ["Dm", "Dl", "Dt", "Dx", "Dj", "Dv", "Ds"],
                dayNamesMin: ["Dm", "Dl", "Dt", "Dx", "Dj", "Dv", "Ds"],
                monthNames: [ "Gener","Febrer","Març","Abril","Maig","Juny","Juliol","Agost","Setembre","Octubre","Novembre","Desembre" ],
                monthNamesShort: [ "Gen", "Feb", "Mar", "Abr", "Mai", "Jun","Jul", "Ago", "Set", "Oct", "Nov", "Des" ],
                today: 'Avui',
                clear: 'Esborra'
            };
        } else if (this.lang==="es") {
            calLocale = {
                firstDayOfWeek: 1,
                dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"],
                monthNames: [ "January","February","March","April","May","June","July","August","September","October","November","December" ],
                monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
                today: 'Today',
                clear: 'Clear'
            };
        }
        else {
            calLocale = {
                firstDayOfWeek: 0,
                dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"],
                monthNames: [ "January","February","March","April","May","June","July","August","September","October","November","December" ],
                monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
                today: 'Today',
                clear: 'Clear'
            };
        }
        return calLocale;
    }
}