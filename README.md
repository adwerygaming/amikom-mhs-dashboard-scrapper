<div align="center">
    <h1>Amikom Mahasiswa API Wrapper</h1>
    <p>Scraps <a href="https://mhs.amikom.ac.id">mhs.amikom.ac.id</a> using puppeteer, and turn into JSON Object. That is Basically a wrapper.</p>
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
3. Automatically Solve Captcha using Capmonster
4. Scrap Dashboard

### Features
- [x] Login (Automated)
- [x] Get Jadwal Kuliah (1 week)
- [x] Get Profil Minimal (Name, NPM, pfp)
- [x] Event Emmiter For Classes
- [x] Get Jadwal Kuliah By Day Name
- [ ] Get Profil Lengkap
- [ ] Get Info Perkuliahan
- [ ] Get Amikom Email Domain Information

### Login Methods
- [x] Manual Login (w/ NPM & Password)
- [ ] Login With Amikom Email Domain
- [ ] Login With Cookies


## Detailed Features
#### Login (automated)

> [!IMPORTANT]
> Make sure you have filled `.env.example`, rename it to `.env`.

Usage:
```ts
const AmikomClient = new AmikomScrapper(npm, pw)
const { status, loginStrategy } = await AmikomClient.Login()

console.log(`[${tags.Amikom}] Login Status: ${status} | Using Strategy: ${loginStrategy}`)
```

Example Response:
```sh
[Amikom] Login Status: success | Using Strategy: manual
[Amikom] Login Status: success | Using Strategy: cookie
[Amikom] Login Status: failed
```


#### Get Jadwal Kuliah (1 week)
Usage:
```ts
const amikom = new AmikomService()
const data: ClassSchedules = await amikom.mhs.GetClassSchedules()
```

Example Response:
```sh
[
    {
        IdHari: 0,
        IdJam: 1,
        IdKuliah: 99999,
        Keterangan: '',
        Hari: 'MINGGU',
        Ruang: '08.73.01',
        Waktu: '03:00-06:00',
        Kode: 'SI999',
        MataKuliah: 'Lorem Ipsum',
        JenisKuliah: 'Praktek',
        Kelas: '25S7SI999-LorIp(SI999)',
        NamaDosen: 'Prof. Dr. Ir. H. Dhevan Adhitya P, S.Kom., M.Kom., M.Sc., M.Eng., MBA., M.Pd., Spd., Ph.D., LL.M., CIPM., CISA., PMP.',
    },
    // ...
]
```

#### Get Profil Minimal
Usage:
```ts
const amikom = new AmikomService()
const data: FetchMeProp = await amikom.mhs.GetMe()
```

Example Response:
```sh
{
    krsLabel: "Aktif",
    krsState: true,
    semesterLabel: "Semester - Genap TA. 1970/1971",
    base64pfp: "aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1kUXc0dzlXZ1hjUQ==",
    name: "Prof. Dr. Ir. H. Dhevan Adhitya P, S.Kom., M.Kom., M.Sc., M.Eng., MBA., M.Pd., Spd., Ph.D., LL.M., CIPM., CISA., PMP.",
    npm: "25.12.9999",
}
```

#### Event Emmiter For Classes
Usage:
```ts
const amikom = new AmikomService()

// Will trigger when class is started
amikom.on("class_started", (classData: ClassSchedule) => {
    console.log(`[${tags.Amikom}] Class Started!`)
    console.log(`[${tags.Amikom}] ${classData.Kelas} - ${classData.NamaDosen}`)
})

// Will trigger when class start in 10 minutes
amikom.on("class_upcoming_10m", (classData: ClassSchedule) => {
    console.log(`[${tags.Amikom}] Class In 10m!`)
    console.log(`[${tags.Amikom}] ${classData.Kelas} - ${classData.NamaDosen}`)
})

// Will trigger when class start in 15 minutes
amikom.on("class_upcoming_15m", (classData: ClassSchedule) => {
    console.log(`[${tags.Amikom}] Class In 15m!`)
    console.log(`[${tags.Amikom}] ${classData.Kelas} - ${classData.NamaDosen}`)
})

// Will trigger when class start in 30 minutes
amikom.on("class_upcoming_30m", (classData: ClassSchedule) => {
    console.log(`[${tags.Amikom}] Class In 30m!`)
    console.log(`[${tags.Amikom}] ${classData.Kelas} - ${classData.NamaDosen}`)
})

// Will trigger when class start in 1 hour
amikom.on("class_upcoming_1h", (classData: ClassSchedule) => {
    console.log(`[${tags.Amikom}] Class In 1h!`)
    console.log(`[${tags.Amikom}] ${classData.Kelas} - ${classData.NamaDosen}`)
})

// Will trigger when class is finished
amikom.on("class_finished", (classData: ClassSchedule) => {
    console.log(`[${tags.Amikom}] Class Ended!`)
    console.log(`[${tags.Amikom}] ${classData.Kelas} - ${classData.NamaDosen}`)
})

// Will trigger when there is error.
amikom.on("error", (e: any) => {
    console.log(`[${tags.Amikom}] AmikomService Error`)
    console.error(e)
})
```

Example Response:
```sh
[Amikom] Class Started!
[Amikom] 26S7SI99-MiAyam(SI999) - Prof. Dr. Ir. H. Dhevan Adhitya P, S.Kom., M.Kom., M.Sc., M.Eng., MBA., M.Pd., Spd., Ph.D., LL.M., CIPM., CISA., PMP.
```

### Support
If you see this project is cool or helpful, consider leave a star 🌟, it would help me get motivated on coding. Thank you! :3