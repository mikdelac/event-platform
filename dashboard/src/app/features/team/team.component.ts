import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { State, getCurrentTeam, getTeamLoading, getTeamError } from "./store/team.reducer";
import { LoadTeam, UpdateTeamName, AddTeamMember } from "./store/team.actions";
import { Team } from "src/app/api/models/team";
import { Attendee } from "src/app/api/models/attendee";
import { AttendeeApi } from "src/app/api/attendee.api";
import { first } from "rxjs/operators";
import { LoadCurrentAttendee } from "src/app/store/app.actions";

@Component({
    selector: "app-team",
    templateUrl: "team.template.html",
    styleUrls: ["team.style.scss"]
})
export class TeamComponent implements OnInit {
    
    currentTeam$ = this.store.pipe(select(getCurrentTeam));
    loading$ = this.store.pipe(select(getTeamLoading));
    error$ = this.store.pipe(select(getTeamError));

    isEditingTeamName: boolean;
    isAddingTeamMember: boolean;
    isAddingTeamGodparent: boolean;
    newAttendee: Attendee;
    teamName: string;

    constructor(private store: Store<State>) { }
    
    ngOnInit() { 
        
        this.isEditingTeamName = false;
        this.isAddingTeamMember = false;
        this.isAddingTeamGodparent = false;
        
        this.store.dispatch(new LoadTeam());

        this.newAttendee = {
            firstName: "",
            lastName: "",
            email: "",
            github: "",
            linkedIn: "",
            cv: "",
            website: "",
            gender: "",
            tshirt: "",
            phoneNumber: "",
            acceptSMSNotifications: null,
            hasDietaryRestrictions: null,
            dietaryRestrictions: null,
            isRegistered: false
        };

    }

    public onEditTeamName(currentTeam: Team): void {
        this.isEditingTeamName = true;
        this.teamName = currentTeam.name;
    }

    public onSaveTeamName(teamName: string): void {
        this.isEditingTeamName = false;
        this.store.dispatch(new UpdateTeamName(teamName));
    }

    public onEditTeamMember(): void {
        this.isAddingTeamMember = true;
        this.newAttendee = {
            firstName: "",
            lastName: "",
            email: "",
            github: "",
            linkedIn: "",
            cv: "",
            website: "",
            gender: "",
            tshirt: "",
            phoneNumber: "",
            acceptSMSNotifications: null,
            hasDietaryRestrictions: null,
            dietaryRestrictions: null,
            isRegistered: false
        };
    }

    public onAddTeamMember(newAttendee: Attendee): void {
        this.isAddingTeamMember = false;
        this.store.dispatch(new AddTeamMember(newAttendee));
    }

    public onCancelTeamName(): void {
        this.isEditingTeamName = false;
        this.store.dispatch(new LoadTeam());
    }

    public onCancelTeamMember(): void {
        this.isAddingTeamMember = false;
    }
}
