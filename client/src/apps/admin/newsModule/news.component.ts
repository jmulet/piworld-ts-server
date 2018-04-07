import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';

import { NewsModel } from '../../../entities/NewsModel';
import { RestApi } from '../../../rest/RestApi';
import { pwCore } from '../../shared/pw-core';
import { OverlayPanel } from 'primeng/components/overlaypanel/overlaypanel';


@Component({
    selector: 'app-news-component',
    templateUrl: './news.component.html',
    styleUrls: []
})
export class NewsComponent implements OnInit {
    op: OverlayPanel;
    targetTable: any;
    opData: any;
    savingOrdering: boolean;
    newsEdtForm: FormGroup;
    newsEdt: NewsModel;
    news: NewsModel[];
    newsSelected: NewsModel;

    constructor(private rest: RestApi, private confirmationService: ConfirmationService,
        private fb: FormBuilder) {
    }
    ngOnInit() {
        this.reload(null);
    }
    reload(evt: any) {
        this.rest.ApiNews.list().subscribe((data: NewsModel[]) => {
            this.news = data;
        });
    }
    removeNews(news: NewsModel) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete News ' + news.title + '?',
            accept: () => { 
                this.rest.ApiNews.delete(news.id).subscribe((data) =>  {
                    this.newsSelected = null;
                    this.reload(null);
                });
            }
        });
    }
    editNews(news?: NewsModel) {
        this.newsEdt = new NewsModel().setObj(news);
        if (!this.newsEdt.id) {
            this.newsEdt.order = this.news.length + 1;
            this.newsEdt.idUserCreator = pwCore.User.id;
        }
        this.newsEdtForm = this.newsEdt.toForm(this.fb);
    }
    createNews() {
        let news: NewsModel;
        if (this.newsSelected) {
            news = <NewsModel> {...this.newsSelected};
            news.id = null;
            news.title = "<Copy> " + news.title;
        }
        this.editNews(news);
    }  
    private move(array: NewsModel[], index: number, offset: number) {
        const newIndex = index + offset
        if (newIndex > -1 && newIndex < array.length) {
            // Remove the element from the array
            const removedElement = array.splice(index, 1)[0];
            // At "newIndex", remove 0 elements, insert the removed element
            array.splice(newIndex, 0, removedElement)

            //Set order property
            array.forEach((e, i) => e.order = i+1);
            
            //Save into database
            const partials = this.news.map((u)=> { return {id: u.id, order: u.order} });
            this.savingOrdering = true;
            this.rest.ApiNews.saveOrdering(partials).subscribe( (data)=> this.savingOrdering = false);
        }
    }
    moveUp(index: number) {
        this.move(this.news, index, -1);
    }
    moveDown(index: number) {
        this.move(this.news, index, 1);
    }
    onRowReorder(ev) {
        //ev.dragIndex ev.dropIndex
        //Save into database
        this.news.forEach((e, i) => e.order = i+1);
        const partials = this.news.map((u)=> { return {id: u.id, order: u.order} });
        this.savingOrdering = true;
        this.rest.ApiNews.saveOrdering(partials).subscribe( (data)=> this.savingOrdering = false);
    }
    onRowSelected(ev) {        
    }
}