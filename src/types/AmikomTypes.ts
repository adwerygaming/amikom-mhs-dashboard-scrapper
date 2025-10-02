import { StudyProgram } from "./AmikomMasterTypes.js"

export const AmikomBaseAPIEndpoint = "https://mhs.amikom.ac.id"

export const AmikomAPIEndpoints = {
    // public
    baseAPIUrl: AmikomBaseAPIEndpoint,
    masterProdi: `${AmikomBaseAPIEndpoint}/api/support/master_prodi`,
    masterJenjangPendidikan: `${AmikomBaseAPIEndpoint}/api/support/master_jenjang_pendidikan`,
    masterAgama: `${AmikomBaseAPIEndpoint}/api/support/master_agama`,
    masterPekerjaan: `${AmikomBaseAPIEndpoint}/api/support/master_pekerjaan`,
    masterPenghasilan: `${AmikomBaseAPIEndpoint}/api/support/master_penghasilan`,
    masterNegara: `${AmikomBaseAPIEndpoint}/api/support/master_negara`,
    masterDaerah: `${AmikomBaseAPIEndpoint}/api/support/master_daerah`,

    // need authorization
    me: `${AmikomBaseAPIEndpoint}/api/personal/init_profil_mhs`,
    classSchedule: `${AmikomBaseAPIEndpoint}/api/perkuliahan/jadwal_kuliah_personal`,
    examSchedule: `${AmikomBaseAPIEndpoint}/api/perkuliahan/jadwal_ujian_personal`,
    studyInfo: `${AmikomBaseAPIEndpoint}/api/perkuliahan/info_perkuliahan`,
    homeServerSide: `${AmikomBaseAPIEndpoint}/api/view/home` // to fetch KRS State
}

export const AmikomEndpoints = {
    rootDomain: "https://amikom.ac.id/",
    loginMhs: `https://auth.amikom.ac.id/mhs`,
    dashboardMhs: "https://mhs.amikom.ac.id/",

    api: AmikomAPIEndpoints
}

export interface GetStudyProgramByCodeProp {
    code: StudyProgram["code"]
}

export type AmikomServiceStatuses = "success" | "failed" | "denied"
export type AmikomKRSType = "Aktif" | "Belum Aktif"

export interface LoginResponse {
    status: AmikomServiceStatuses
    loginStrategy?: "manual" | "cookie" | "google"
}

export interface FetchMeProp {
    krsLabel?: AmikomKRSType | null,
    krsState?: boolean | null,
    semesterLabel?: string | null,
    base64pfp?: string | null,
    name?: string | null,
    npm?: string | null,
}

export interface FetchMeResponse extends FetchMeProp {
    status: AmikomServiceStatuses,
}

export type ListHari = "SENIN" | "SELASA" | "RABU" | "KAMIS" | "JUMAT"

export type RawClassScheduleResponse = ClassSchedule[] | { Message: string };

export interface GetClassScheduleResponse { 
    status: AmikomServiceStatuses,
    data: ClassSchedule[] | null
}

export type ClassSchedules = ClassSchedule[]

// Removed sensitive & useless fields
export interface ClassSchedule {
    IdHari: 0 | 1 | 2 | 3 | 4 | 5 | 6
    IdJam: 1 | 2 | 3 | 4 // Sesi
    IdKuliah: number
    Keterangan: string
    Hari: ListHari
    Ruang: string // normal classroom "x.x.x" | lab room "L x.x.x"
    Waktu: string
    Kode: string
    MataKuliah: string
    JenisKuliah: "Teori" | "Praktikum"
    Kelas: string
    NamaDosen: string
    IsBolehPresensi: 1 | 0
}
