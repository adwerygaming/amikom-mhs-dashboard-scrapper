<div align="center">
    <h1>Amikom Mahasiswa Dashboard Scrapper</h1>
    <p>Scraps <a href="https://mhs.amikom.ac.id">mhs.amikom.ac.id</a> using puppetteer. And turn into JSON Object.</p>
</div>

> [!CAUTION]
> <b>Use this tool on your own risk!</b> I'm not responsible if your Amikom ID got banned or terminated. Please contact DAAK for that. :3

### What is this project about?
It's a web scrapper using puppeteer to scrap & collect data from <a href="https://mhs.amikom.ac.id">mhs.amikom.ac.id</a>, it fetches data from it then proces it into JSON object.

### Why this project exists?
At first, i'm planning to make a reminder bot. It remind you 30m before class starts. Still work in progress. I did not plan to mess up with amikom system.

### How does this project works?
Since the dashboard dosen't have any REST API, scrap is the only way.

And It's act just like normal students.
1. Open <a href="https://mhs.amikom.ac.id">mhs.amikom.ac.id</a>
2. Login with Student NPM & Password
3. Solve Captcha using Monstercap
4. Scrap Dashboard

### Features
- [x] Get Jadwal Kuliah
- [x] Get Profil Minimal (Name, NPM, pfp)
- [ ] Get Profil Lengkap
- [ ] Get Info Perkuliahan
- [ ] Get Amikom Email Domain Information

### Login Methods
- [x] Manual Login (w/ NPM & Password)
- [ ] Login With Amikom Email Domain
- [ ] Login With Cookies

<hr>

#### Get Jadwal Kuliah
Usage:
```ts
import { AmikomService } from "./amikom/AmikomService.js";
const data: ClassSchedules = await AmikomService.mhs.GetClassSchedules()
```

Example Response:
```ts
export type ClassSchedules = ClassSchedule[] // Array of ClassSchedule

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
```

#### Get Profil Minimal
Usage:
```ts
const data: FetchMeProp = await AmikomService.mhs.GetMe()
```

Example Response:
```ts
export interface FetchMeProp {
    krsLabel?: AmikomKRSType | null,
    krsState?: boolean | null,
    semesterLabel?: string | null, // Semester - Genap TA. 1970/1971
    base64pfp?: string | null, // long string of base64
    name?: string | null, // Prof.Dr.Ir. Mas Depan S.Kom.M.Kom
    npm?: string | null, // 25.12.9999
}
```