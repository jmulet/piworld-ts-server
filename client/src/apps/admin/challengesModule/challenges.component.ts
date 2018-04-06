import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';

import { ChallengesModel } from '../../../entities/ChallengesModel';
import { RestApi } from '../../../rest/RestApi';
import { pwCore } from '../../shared/pw-core';
import { ChallengesQuizzModel } from '../../../entities/ChallengesQuizzModel';


@Component({
    selector: 'app-challenges-component',
    templateUrl: './challenges.component.html',
    styleUrls: []
})
export class ChallengesComponent implements OnInit {
    answerSelected: ChallengesQuizzModel;
    challengeSelected: ChallengesModel;
    challengeEdtForm: FormGroup;
    challengeEdt: ChallengesModel;
    challenges: ChallengesModel[];
    
    constructor(private rest: RestApi, private confirmationService: ConfirmationService,
        private fb: FormBuilder) {
    }
    ngOnInit() {
        this.reload(null);
    }
    reload(evt: any) {
        let idUser = pwCore.User.id > 1 ? pwCore.User.id : null;
        this.rest.ApiChallenges.list(null, null, idUser).subscribe((data: any[]) => {
            this.challenges = data;
        });
    }
    removeChallenge(entity: ChallengesModel) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete challenge #' + entity.id + ' and all associated users and data?',
            accept: () => {
                // This is a risky operation and should ask password
                this.rest.ApiChallenges.delete(entity.id).subscribe((data) =>  {
                    this.reload(null);
                });
            }
        });
    }
    editChallenge(challenge?: ChallengesModel) {
        this.challengeEdt = new ChallengesModel().setObj(challenge);
        if (!this.challengeEdt.id) {
            this.challengeEdt.idUserCreator = pwCore.User.id;
            this.challengeEdt.score = 100;
            this.challengeEdt.fromDay = new Date();
            this.challengeEdt.toDay = new Date(this.challengeEdt.fromDay.getTime() + 604800000);
        }
        this.challengeEdtForm = this.challengeEdt.toForm(this.fb);
    }
    createChallenge() {
        this.editChallenge();
    }  
    onChallengeSelect(evt){
        this.answerSelected = null;
    }
    answerChanged(evt) {
        console.log(evt, this.answerSelected);
        if (!this.answerSelected) {
            return;
        }
        this.rest.ApiChallenges.saveQuizz(this.answerSelected);
    }
}