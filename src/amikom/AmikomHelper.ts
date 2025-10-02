import { StudyProgram, StudyPrograms } from "../types/AmikomMasterTypes.js";
import { GetStudyProgramByCodeProp } from "../types/AmikomTypes.js";

export class AmikomTypes {
    async GetStudyPrograms(): Promise<StudyProgram[]> {
        const typedPrograms: StudyProgram[] = StudyPrograms as StudyProgram[];

        return typedPrograms
    }

    async GetStudyProgramByCode({ code }: GetStudyProgramByCodeProp): Promise<StudyProgram | null> {
        if (!code) {
            return null
        }

        const studyPrograms = await this.GetStudyPrograms()
        const theChosenOne = studyPrograms.find((x) => x.code == code) ?? null

        return theChosenOne
    }
}
