// Jenjang Pendidikan
export interface EducationLevel {
    id: number;
    name: string;
}

export const EducationLevels: EducationLevel[] = [
    { "id": 0, "name": "Tidak sekolah" },
    { "id": 3, "name": "Putus SD" },
    { "id": 4, "name": "SD / sederajat" },
    { "id": 5, "name": "SMP / sederajat" },
    { "id": 6, "name": "SMA / sederajat" },
    { "id": 20, "name": "D1" },
    { "id": 21, "name": "D2" },
    { "id": 22, "name": "D3" },
    { "id": 23, "name": "D4" },
    { "id": 25, "name": "Profesi" },
    { "id": 30, "name": "S1" },
    { "id": 32, "name": "Sp-1" },
    { "id": 35, "name": "S2" },
    { "id": 37, "name": "Sp-2" },
    { "id": 40, "name": "S3" }
]

// Study Program / Prodi
export interface StudyProgram {
    code: string;
    name: string;
}

export const StudyPrograms: StudyProgram[] = [
    { "code": "01", "name": "D3 - Teknik Informatika (01)" },
    { "code": "02", "name": "D3 - Manajemen Informatika (02)" },
    { "code": "03", "name": "D3 - Teknik Informatika, RPL (03)" },
    { "code": "04", "name": "D3 - Manajemen Informatika, RPL (04)" },
    { "code": "11", "name": "S1 - Informatika (11)" },
    { "code": "12", "name": "S1 - Sistem Informasi (12)" },
    { "code": "14", "name": "S1 - Arsitektur, RPL (14)" },
    { "code": "15", "name": "S1 - Geografi, RPL (15)" },
    { "code": "21", "name": "S1 - Informatika, Transfer (21)" },
    { "code": "22", "name": "S1 - Sistem Informasi, Transfer (22)" },
    { "code": "31", "name": "S1 - Informatika, RPL (31)" },
    { "code": "32", "name": "S1 - Sistem Informasi, RPL (32)" },
    { "code": "42", "name": "S1 - Kewirausahaan, RPL (42)" },
    { "code": "43", "name": "S1 - Akuntansi, RPL (43)" },
    { "code": "44", "name": "S1 - Teknologi Informasi, Kelas Karyawan (44)" },
    { "code": "45", "name": "S1 - Teknik Komputer, Kelas Karyawan (45)" },
    { "code": "46", "name": "S1 - Ilmu Komunikasi, RPL (46)" },
    { "code": "47", "name": "S1 - Ekonomi, RPL (47)" },
    { "code": "51", "name": "S2 - Magister Teknik Informatika (51)" },
    { "code": "52", "name": "S2 - Magister Teknik Informatika, Exc (52)" },
    { "code": "53", "name": "S2 - Master Informatics (53)" },
    { "code": "54", "name": "S2 - Magister Teknik Informatika,Kerjasama (54)" },
    { "code": "55", "name": "S2 - PJJ Magister Teknik Informatika (55)" },
    { "code": "60", "name": "S1 - Bachelor Information Technology (60)" },
    { "code": "61", "name": "S1 - Bachelor Informatics (61)" },
    { "code": "62", "name": "S1 - Bachelor Information System (62)" },
    { "code": "66", "name": "S1 - Computer Science Student Exchange (66)" },
    { "code": "67", "name": "S1 - Bachelor Communication Science (67)" },
    { "code": "82", "name": "S1 - Teknologi Informasi (82)" },
    { "code": "83", "name": "S1 - Teknik Komputer (83)" },
    { "code": "84", "name": "S1 - Arsitektur (84)" },
    { "code": "85", "name": "S1 - Geografi (85)" },
    { "code": "86", "name": "S1 - Perencanaan Wilayah Dan Kota (86)" },
    { "code": "91", "name": "S1 - Ekonomi (91)" },
    { "code": "92", "name": "S1 - Kewirausahaan (92)" },
    { "code": "93", "name": "S1 - Akuntansi (93)" },
    { "code": "94", "name": "S1 - Ilmu Pemerintahan (94)" },
    { "code": "95", "name": "S1 - Hubungan Internasional (95)" },
    { "code": "96", "name": "S1 - Ilmu Komunikasi (96)" },
    { "code": "99", "name": "S3 - Doktor Informatika (99)" }
]


// Religions / Agama
export type ReligionID =
    | "I"
    | "P"
    | "K"
    | "H"
    | "B"
    | "KH"
    | "L";

export type ReligionName =
    | "Islam"
    | "Kristen"
    | "Katholik"
    | "Hindu"
    | "Budha"
    | "Khonghucu"
    | "Lainnya";

export interface Religion {
    id: string;
    name: string;
}

export const Religions: Religion[] = [
    { "id": "I", "name": "Islam" },
    { "id": "P", "name": "Kristen" },
    { "id": "K", "name": "Katholik" },
    { "id": "H", "name": "Hindu" },
    { "id": "B", "name": "Budha" },
    { "id": "KH", "name": "Khonghucu" },
    { "id": "L", "name": "Lainnya" }
]

// Occupations / Pekerjaan
export interface Occupation {
    id: number;
    name: string;
}

export const Occupations: Occupation[] = [
    { "id": 1, "name": "Tidak bekerja" },
    { "id": 2, "name": "Nelayan" },
    { "id": 3, "name": "Petani" },
    { "id": 4, "name": "Peternak" },
    { "id": 5, "name": "PNS/TNI/Polri" },
    { "id": 6, "name": "Karyawan Swasta" },
    { "id": 7, "name": "Pedagang Kecil" },
    { "id": 8, "name": "Pedagang Besar" },
    { "id": 9, "name": "Wiraswasta" },
    { "id": 10, "name": "Wirausaha" },
    { "id": 11, "name": "Buruh" },
    { "id": 12, "name": "Pensiunan" },
    { "id": 98, "name": "Sudah Meninggal" },
    { "id": 99, "name": "Lainnya" }
]


// Incomes / Penghasilan
export interface Income {
    id: number;
    name: string;
}

export const Incomes: Income[] = [
    { "id": 11, "name": "Kurang dari Rp. 500,000" },
    { "id": 12, "name": "Rp. 500,000 - Rp. 999,999" },
    { "id": 13, "name": "Rp. 1,000,000 - Rp. 1,999,999" },
    { "id": 14, "name": "Rp. 2,000,000 - Rp. 4,999,999" },
    { "id": 15, "name": "Rp. 5,000,000 - Rp. 20,000,000" },
    { "id": 16, "name": "Lebih dari Rp. 20,000,000" }
]

// Country / Negara
export interface Country {
    id: string;
    name: string;
}

export const Countries: Country[] = [
    { "id": "AD", "name": "Andorra" },
    { "id": "AE", "name": "United Arab Emirates" },
    { "id": "AF", "name": "Afghanistan" },
    { "id": "AG", "name": "Antigua And Barbuda" },
    { "id": "AI", "name": "Anguilla" },
    { "id": "AL", "name": "Albania" },
    { "id": "AM", "name": "Armenia" },
    { "id": "AN", "name": "Netherlands Antilles" },
    { "id": "AO", "name": "Angola" },
    { "id": "AQ", "name": "Antarctica" },
    { "id": "AR", "name": "Argentina" },
    { "id": "AS", "name": "American Samoa" },
    { "id": "AT", "name": "Austria" },
    { "id": "AU", "name": "Australia" },
    { "id": "AW", "name": "Aruba" },
    { "id": "AX", "name": "Aland Islands" },
    { "id": "AZ", "name": "Azerbaijan" },
    { "id": "BA", "name": "Bosnia And Herzegovina" },
    { "id": "BB", "name": "Barbados" },
    { "id": "BD", "name": "Bangladesh" },
    { "id": "BE", "name": "Belgium" },
    { "id": "BF", "name": "Burkina Faso" },
    { "id": "BG", "name": "Bulgaria" },
    { "id": "BH", "name": "Bahrain" },
    { "id": "BI", "name": "Burundi" },
    { "id": "BJ", "name": "Benin" },
    { "id": "BM", "name": "Bermuda" },
    { "id": "BN", "name": "Brunei Darussalam" },
    { "id": "BO", "name": "Bolivia" },
    { "id": "BR", "name": "Brazil" },
    { "id": "BS", "name": "Bahamas" },
    { "id": "BT", "name": "Bhutan" },
    { "id": "BV", "name": "Bouvet Island" },
    { "id": "BW", "name": "Botswana" },
    { "id": "BY", "name": "Belarus" },
    { "id": "BZ", "name": "Belize" },
    { "id": "CA", "name": "Canada" },
    { "id": "CC", "name": "Cocos (Keeling) Islands" },
    { "id": "CD", "name": "Congo, The Democratic Republic Of The" },
    { "id": "CF", "name": "Central African Republic" },
    { "id": "CG", "name": "Congo" },
    { "id": "CH", "name": "Switzerland" },
    { "id": "CI", "name": "Cote D`Ivoire" },
    { "id": "CK", "name": "Cook Islands" },
    { "id": "CL", "name": "Chile" },
    { "id": "CM", "name": "Cameroon" },
    { "id": "CN", "name": "China" },
    { "id": "CO", "name": "Colombia" },
    { "id": "CR", "name": "Costa Rica" },
    { "id": "CS", "name": "Serbia And Montenegro" },
    { "id": "CU", "name": "Cuba" },
    { "id": "CV", "name": "Cape Verde" },
    { "id": "CX", "name": "Christmas Island" },
    { "id": "CY", "name": "Cyprus" },
    { "id": "CZ", "name": "Czech Republic" },
    { "id": "DE", "name": "Germany" },
    { "id": "DJ", "name": "Djibouti" },
    { "id": "DK", "name": "Denmark" },
    { "id": "DM", "name": "Dominica" },
    { "id": "DO", "name": "Dominican Republic" },
    { "id": "DZ", "name": "Algeria" },
    { "id": "EC", "name": "Ecuador" },
    { "id": "EE", "name": "Estonia" },
    { "id": "EG", "name": "Egypt" },
    { "id": "EH", "name": "Western Sahara" },
    { "id": "ER", "name": "Eritrea" },
    { "id": "ES", "name": "Spain" },
    { "id": "ET", "name": "Ethiopia" },
    { "id": "FI", "name": "Finland" },
    { "id": "FJ", "name": "Fiji" },
    { "id": "FK", "name": "Falkland Islands (Malvinas)" },
    { "id": "FM", "name": "Micronesia, Federated States Of" },
    { "id": "FO", "name": "Faroe Islands" },
    { "id": "FR", "name": "France" },
    { "id": "GA", "name": "Gabon" },
    { "id": "GB", "name": "United Kingdom" },
    { "id": "GD", "name": "Grenada" },
    { "id": "GE", "name": "Georgia" },
    { "id": "GF", "name": "French Guiana" },
    { "id": "GG", "name": "Guernsey" },
    { "id": "GH", "name": "Ghana" },
    { "id": "GI", "name": "Gibraltar" },
    { "id": "GL", "name": "Greenland" },
    { "id": "GM", "name": "Gambia" },
    { "id": "GN", "name": "Guinea" },
    { "id": "GP", "name": "Guadeloupe" },
    { "id": "GQ", "name": "Equatorial Guinea" },
    { "id": "GR", "name": "Greece" },
    { "id": "GS", "name": "South Georgia And The South Sandwich Islands" },
    { "id": "GT", "name": "Guatemala" },
    { "id": "GU", "name": "Guam" },
    { "id": "GW", "name": "Guinea-Bissau" },
    { "id": "GY", "name": "Guyana" },
    { "id": "HK", "name": "Hong Kong" },
    { "id": "HM", "name": "Heard Island And Mcdonald Islands" },
    { "id": "HN", "name": "Honduras" },
    { "id": "HR", "name": "Croatia" },
    { "id": "HT", "name": "Haiti" },
    { "id": "HU", "name": "Hungary" },
    { "id": "ID", "name": "Indonesia" },
    { "id": "IE", "name": "Ireland" },
    { "id": "IL", "name": "Israel" },
    { "id": "IM", "name": "Isle Of Man" },
    { "id": "IN", "name": "India" },
    { "id": "IO", "name": "British Indian Ocean Territory" },
    { "id": "IQ", "name": "Iraq" },
    { "id": "IR", "name": "Iran, Islamic Republic Of" },
    { "id": "IS", "name": "Iceland" },
    { "id": "IT", "name": "Italy" },
    { "id": "JE", "name": "Jersey" },
    { "id": "JM", "name": "Jamaica" },
    { "id": "JO", "name": "Jordan" },
    { "id": "JP", "name": "Japan" },
    { "id": "KE", "name": "Kenya" },
    { "id": "KG", "name": "Kyrgyzstan" },
    { "id": "KH", "name": "Cambodia" },
    { "id": "KI", "name": "Kiribati" },
    { "id": "KM", "name": "Comoros" },
    { "id": "KN", "name": "Saint Kitts And Nevis" },
    { "id": "KP", "name": "Korea, Democratic People`S Republic Of" },
    { "id": "KR", "name": "Korea, Republic Of" },
    { "id": "KW", "name": "Kuwait" },
    { "id": "KY", "name": "Cayman Islands" },
    { "id": "KZ", "name": "Kazakhstan" },
    { "id": "LA", "name": "Lao People`S Democratic Republic" },
    { "id": "LB", "name": "Lebanon" },
    { "id": "LC", "name": "Saint Lucia" },
    { "id": "LI", "name": "Liechtenstein" },
    { "id": "LK", "name": "Sri Lanka" },
    { "id": "LR", "name": "Liberia" },
    { "id": "LS", "name": "Lesotho" },
    { "id": "LT", "name": "Lithuania" },
    { "id": "LU", "name": "Luxembourg" },
    { "id": "LV", "name": "Latvia" },
    { "id": "LY", "name": "Libyan Arab Jamahiriya" },
    { "id": "MA", "name": "Morocco" },
    { "id": "MC", "name": "Monaco" },
    { "id": "MD", "name": "Moldova, Republic Of" },
    { "id": "MG", "name": "Madagascar" },
    { "id": "MH", "name": "Marshall Islands" },
    { "id": "MK", "name": "Macedonia, The Former Yugoslav Republic Of" },
    { "id": "ML", "name": "Mali" },
    { "id": "MM", "name": "Myanmar" },
    { "id": "MN", "name": "Mongolia" },
    { "id": "MO", "name": "Macao" },
    { "id": "MP", "name": "Northern Mariana Islands" },
    { "id": "MQ", "name": "Martinique" },
    { "id": "MR", "name": "Mauritania" },
    { "id": "MS", "name": "Montserrat" },
    { "id": "MT", "name": "Malta" },
    { "id": "MU", "name": "Mauritius" },
    { "id": "MV", "name": "Maldives" },
    { "id": "MW", "name": "Malawi" },
    { "id": "MX", "name": "Mexico" },
    { "id": "MY", "name": "Malaysia" },
    { "id": "MZ", "name": "Mozambique" },
    { "id": "NA", "name": "Namibia" },
    { "id": "NC", "name": "New Caledonia" },
    { "id": "NE", "name": "Niger" },
    { "id": "NF", "name": "Norfolk Island" },
    { "id": "NG", "name": "Nigeria" },
    { "id": "NI", "name": "Nicaragua" },
    { "id": "NL", "name": "Netherlands" },
    { "id": "NO", "name": "Norway" },
    { "id": "NP", "name": "Nepal" },
    { "id": "NR", "name": "Nauru" },
    { "id": "NU", "name": "Niue" },
    { "id": "NZ", "name": "New Zealand" },
    { "id": "OM", "name": "Oman" },
    { "id": "PA", "name": "Panama" },
    { "id": "PE", "name": "Peru" },
    { "id": "PF", "name": "French Polynesia" },
    { "id": "PG", "name": "Papua New Guinea" },
    { "id": "PH", "name": "Philippines" },
    { "id": "PK", "name": "Pakistan" },
    { "id": "PL", "name": "Poland" },
    { "id": "PM", "name": "Saint Pierre And Miquelon" },
    { "id": "PN", "name": "Pitcairn" },
    { "id": "PR", "name": "Puerto Rico" },
    { "id": "PS", "name": "Palestinian Territory, Occupied" },
    { "id": "PT", "name": "Portugal" },
    { "id": "PW", "name": "Palau" },
    { "id": "PY", "name": "Paraguay" },
    { "id": "QA", "name": "Qatar" },
    { "id": "RE", "name": "Reunion" },
    { "id": "RO", "name": "Romania" },
    { "id": "RU", "name": "Russian Federation" },
    { "id": "RW", "name": "Rwanda" },
    { "id": "SA", "name": "Saudi Arabia" },
    { "id": "SB", "name": "Solomon Islands" },
    { "id": "SC", "name": "Seychelles" },
    { "id": "SD", "name": "Sudan" },
    { "id": "SE", "name": "Sweden" },
    { "id": "SG", "name": "Singapore" },
    { "id": "SH", "name": "Saint Helena" },
    { "id": "SI", "name": "Slovenia" },
    { "id": "SJ", "name": "Svalbard And Jan Mayen" },
    { "id": "SK", "name": "Slovakia" },
    { "id": "SL", "name": "Sierra Leone" },
    { "id": "SM", "name": "San Marino" },
    { "id": "SN", "name": "Senegal" },
    { "id": "SO", "name": "Somalia" },
    { "id": "SR", "name": "Suriname" },
    { "id": "ST", "name": "Sao Tome And Principe" },
    { "id": "SV", "name": "El Salvador" },
    { "id": "SY", "name": "Syrian Arab Republic" },
    { "id": "SZ", "name": "Swaziland" },
    { "id": "TC", "name": "Turks And Caicos Islands" },
    { "id": "TD", "name": "Chad" },
    { "id": "TF", "name": "French Southern Territories" },
    { "id": "TG", "name": "Togo" },
    { "id": "TH", "name": "Thailand" },
    { "id": "TJ", "name": "Tajikistan" },
    { "id": "TK", "name": "Tokelau" },
    { "id": "TL", "name": "Timor-Leste" },
    { "id": "TM", "name": "Turkmenistan" },
    { "id": "TN", "name": "Tunisia" },
    { "id": "TO", "name": "Tonga" },
    { "id": "TR", "name": "Turkey" },
    { "id": "TT", "name": "Trinidad And Tobago" },
    { "id": "TV", "name": "Tuvalu" },
    { "id": "TW", "name": "Taiwan, Province Of China" },
    { "id": "TZ", "name": "Tanzania, United Republic Of" },
    { "id": "UA", "name": "Ukraine" },
    { "id": "UG", "name": "Uganda" },
    { "id": "UM", "name": "United States Minor Outlying Islands" },
    { "id": "US", "name": "United States" },
    { "id": "UY", "name": "Uruguay" },
    { "id": "UZ", "name": "Uzbekistan" },
    { "id": "VA", "name": "Holy See (Vatican City State)" },
    { "id": "VC", "name": "Saint Vincent And The Grenadines" },
    { "id": "VE", "name": "Venezuela" },
    { "id": "VG", "name": "Virgin Islands, British" },
    { "id": "VI", "name": "Virgin Islands, U.S." },
    { "id": "VN", "name": "Viet Nam" },
    { "id": "VU", "name": "Vanuatu" },
    { "id": "WF", "name": "Wallis And Futuna" },
    { "id": "WS", "name": "Samoa" },
    { "id": "YE", "name": "Yemen" },
    { "id": "YT", "name": "Mayotte" },
    { "id": "ZA", "name": "South Africa" },
    { "id": "ZM", "name": "Zambia" },
    { "id": "ZW", "name": "Zimbabwe" }
]

