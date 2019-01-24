import { CodeException } from '../../../filters/code-error/code.exception';
import { CodeMap } from "../../../filters/code-error/code.filter";
import { HttpStatus } from "@nestjs/common";

export enum Code {
    UNKNOWN,
    ATTENDEE_ALREADY_EXIST,
    TEAM_ALREADY_EXIST,
    MAX_TEAM_MEMBER_NUMBER,
    GOD_FATHER_ALREADY_EXIST
}

export const codeMap: CodeMap = {
    [Code.UNKNOWN]: {
        message: 'An unknown error happened.',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR
    },
    [Code.ATTENDEE_ALREADY_EXIST]: {
        message: 'Attendee already exist.',
        statusCode: HttpStatus.BAD_REQUEST
    },
    [Code.TEAM_ALREADY_EXIST]: {
        message: 'Team already exist.',
        statusCode: HttpStatus.BAD_REQUEST
    },
    [Code.MAX_TEAM_MEMBER_NUMBER]: {
        message: 'The maximum amount of members in the team has been already reached.',
        statusCode: HttpStatus.BAD_REQUEST
    },
    [Code.GOD_FATHER_ALREADY_EXIST]: {
        message: 'The current team has already a god father.',
        statusCode: HttpStatus.BAD_REQUEST
    }
}

export class AttendeeAlreadyExistException extends CodeException {
    constructor() {
        super(Code.ATTENDEE_ALREADY_EXIST);
    }
}

export class TeamAlreadyExistException extends CodeException {
    constructor () {
        super(Code.TEAM_ALREADY_EXIST);
    }
}

export class MaxTeamMemberException extends CodeException {
    constructor () {
        super(Code.MAX_TEAM_MEMBER_NUMBER);
    }
}

export class GodFatherAlreadyExist extends CodeException {
    constructor () {
        super(Code.GOD_FATHER_ALREADY_EXIST);
    }
}