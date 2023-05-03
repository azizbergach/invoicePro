import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CompanyCard } from 'src/sections/companies/company-card';
import { useMemo, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AddPopup from 'src/layouts/dashboard/Add';
import FilterCompanies from 'src/sections/companies/companies-filter';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { applyPagination } from 'src/utils/apply-pagination';


const data = [
  {
    id: 'pjpgjhipac',
    name: 'Dr. Doreen Beer MD',
    phoneNumber: '667534581',
    address: '4825 Luciano Row',
    city: 'Westfield',
    ifNumber: '119238',
    tpNumber: '1000013807',
    iceNumber: '1000012619',
    type: 'auto-entrepreneur',
    bank: 'CIH',
    rib: '4784989121981521',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1143.jpg',
    invoiceId: 'ys62g6bm3p'
  },
  {
    id: 'a8jrkgfz2y',
    name: 'Gregory Harber',
    phoneNumber: '634513722',
    address: '33778 Mozelle Highway',
    city: 'St. Paul',
    ifNumber: '159363',
    tpNumber: '1000082035',
    iceNumber: '1000077020',
    type: 'auto-entrepreneur',
    bank: 'Al barid bank',
    rib: '7053065266725003',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1135.jpg',
    invoiceId: 'fy7b88a9h2'
  },
  {
    id: 'c3pxzwq1ii',
    name: 'Randolph Zboncak',
    phoneNumber: '695670528',
    address: '966 Doris Plains',
    city: 'Hilo',
    ifNumber: '104249',
    tpNumber: '1000048846',
    iceNumber: '1000007454',
    type: 'auto-entrepreneur',
    bank: 'Al barid bank',
    rib: '1470493969671509',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/35.jpg',
    invoiceId: 'x15ytrcm4b'
  },
  {
    id: 'xo3k2n21nf',
    name: 'Anita Aufderhar',
    phoneNumber: '646764041',
    address: '7788 Laurie Summit',
    city: 'Arcadia',
    ifNumber: '176184',
    tpNumber: '1000076093',
    iceNumber: '1000036546',
    type: 'société',
    bank: 'Bank of Africa',
    rib: '2248514398070689',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/786.jpg',
    invoiceId: '87asko0rjd'
  },
  {
    id: 'lvyds42gkf',
    name: 'Christie Kuphal',
    phoneNumber: '654983476',
    address: '050 Terry Roads',
    city: 'Moline',
    ifNumber: '146794',
    tpNumber: '1000006143',
    iceNumber: '1000000062',
    type: 'auto-entrepreneur',
    bank: 'Bank of Africa',
    rib: '9116775580557896',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1164.jpg',
    invoiceId: 'p4w07k8wap'
  },
  {
    id: 'df3r4x4b49',
    name: 'Ada Effertz Jr.',
    phoneNumber: '660163562',
    address: '45200 Shields Landing',
    city: 'Orland Park',
    ifNumber: '177779',
    tpNumber: '1000005571',
    iceNumber: '1000048812',
    type: 'auto-entrepreneur',
    bank: 'Al barid bank',
    rib: '8592841885322445',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/839.jpg',
    invoiceId: '83whtdlup1'
  },
  {
    id: '55ame182gz',
    name: 'Jon McDermott',
    phoneNumber: '621888731',
    address: '9629 Olen Cliff',
    city: 'Porterville',
    ifNumber: '101167',
    tpNumber: '1000002447',
    iceNumber: '1000050797',
    type: 'auto-entrepreneur',
    bank: 'Al barid bank',
    rib: '8006212017378044',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/128.jpg',
    invoiceId: '7qt23jiwcy'
  },
  {
    id: 's3o22w5t3c',
    name: 'Katherine Heller',
    phoneNumber: '605176545',
    address: '053 Jaquelin Creek',
    city: 'San Bernardino',
    ifNumber: '193914',
    tpNumber: '1000037251',
    iceNumber: '1000066715',
    type: 'société',
    bank: 'Bank of Africa',
    rib: '5674292552988904',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/855.jpg',
    invoiceId: 'xox4cdiu0z'
  },
  {
    id: 'puo6btck6l',
    name: 'Ms. Georgia Flatley',
    phoneNumber: '632351104',
    address: '860 Sarai Club',
    city: 'Bossier City',
    ifNumber: '190285',
    tpNumber: '1000051391',
    iceNumber: '1000093734',
    type: 'société',
    bank: 'Al barid bank',
    rib: '9585823028439929',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/22.jpg',
    invoiceId: 'n5cs2n0a6d'
  },
  {
    id: 'm92ozytud7',
    name: 'Roy Homenick',
    phoneNumber: '603213710',
    address: '421 Dewayne Villages',
    city: 'Baldwin Park',
    ifNumber: '175125',
    tpNumber: '1000027219',
    iceNumber: '1000037824',
    type: 'société',
    bank: 'Bank of Africa',
    rib: '9259933651490267',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/140.jpg',
    invoiceId: 'cpdagb8u69'
  },
  {
    id: 'e6yg09brex',
    name: 'Ms. Norma Bailey',
    phoneNumber: '625689351',
    address: '789 Thiel Glen',
    city: 'Fort Smith',
    ifNumber: '157888',
    tpNumber: '1000049369',
    iceNumber: '1000020901',
    type: 'société',
    bank: 'Bank of Africa',
    rib: '7348143881553344',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/253.jpg',
    invoiceId: 'k40fgswtgu'
  },
  {
    id: 'qwojo7xncp',
    name: 'Dora Johnson',
    phoneNumber: '646536196',
    address: '9168 Norene Point',
    city: 'Broken Arrow',
    ifNumber: '179150',
    tpNumber: '1000075415',
    iceNumber: '1000091299',
    type: 'société',
    bank: 'Al barid bank',
    rib: '5060908440955065',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1155.jpg',
    invoiceId: 'ik2lix8ty6'
  },
  {
    id: 'opmmtyoj82',
    name: 'Mrs. Kristen Metz',
    phoneNumber: '636185526',
    address: '27810 Alvis Shoals',
    city: 'Phoenix',
    ifNumber: '106156',
    tpNumber: '1000055755',
    iceNumber: '1000027221',
    type: 'société',
    bank: 'CIH',
    rib: '4126291894423943',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/497.jpg',
    invoiceId: '8uyjp6qud1'
  },
  {
    id: 'ov6tqonky0',
    name: 'Ismael Rau',
    phoneNumber: '694330200',
    address: '285 Nikolas Lodge',
    city: 'Bellevue',
    ifNumber: '112732',
    tpNumber: '1000051894',
    iceNumber: '1000040988',
    type: 'société',
    bank: 'Bank of Africa',
    rib: '6643057580247162',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/212.jpg',
    invoiceId: 'muktfyvxvq'
  },
  {
    id: 'wsgwkjt4tm',
    name: 'Faith Toy',
    phoneNumber: '695421853',
    address: '82164 Kuphal Forge',
    city: 'Lehi',
    ifNumber: '166223',
    tpNumber: '1000092374',
    iceNumber: '1000076009',
    type: 'auto-entrepreneur',
    bank: 'CIH',
    rib: '4318811903495430',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/684.jpg',
    invoiceId: 'xorg8mzywf'
  },
  {
    id: '9vffs3ftdf',
    name: 'Russell Turcotte',
    phoneNumber: '632478518',
    address: '88680 Murphy Mountains',
    city: 'Battle Creek',
    ifNumber: '149028',
    tpNumber: '1000071443',
    iceNumber: '1000030655',
    type: 'auto-entrepreneur',
    bank: 'CIH',
    rib: '1524796518669573',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/833.jpg',
    invoiceId: 'x4z0ch9cdy'
  },
  {
    id: 'cptdhl82ae',
    name: 'Douglas Bayer',
    phoneNumber: '606169210',
    address: '7440 Mraz Roads',
    city: 'Yonkers',
    ifNumber: '130463',
    tpNumber: '1000016033',
    iceNumber: '1000039021',
    type: 'auto-entrepreneur',
    bank: 'Al barid bank',
    rib: '6186458620353240',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/677.jpg',
    invoiceId: 'v25lcmy58q'
  },
  {
    id: 'j94v1b5unc',
    name: 'Pedro Langworth',
    phoneNumber: '681336569',
    address: '890 Keegan Overpass',
    city: 'Aurora',
    ifNumber: '122345',
    tpNumber: '1000057141',
    iceNumber: '1000046232',
    type: 'société',
    bank: 'CIH',
    rib: '6174815694547060',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/730.jpg',
    invoiceId: 'kplwhiouvh'
  },
  {
    id: '3s3qxscs9h',
    name: 'Dallas Kub III',
    phoneNumber: '678427418',
    address: '155 Francesco Tunnel',
    city: 'League City',
    ifNumber: '159924',
    tpNumber: '1000069687',
    iceNumber: '1000032877',
    type: 'auto-entrepreneur',
    bank: 'CIH',
    rib: '9763430491753910',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/953.jpg',
    invoiceId: 'tqe1e7qt6c'
  },
  {
    id: 'feq8t5gf24',
    name: 'Paula Thiel',
    phoneNumber: '666774464',
    address: '54159 Caden Gardens',
    city: 'North Lauderdale',
    ifNumber: '114337',
    tpNumber: '1000033159',
    iceNumber: '1000017086',
    type: 'auto-entrepreneur',
    bank: 'CIH',
    rib: '1111572282355196',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/157.jpg',
    invoiceId: 'rbygphjl79'
  },
  {
    id: 'v5ckl3j936',
    name: 'Samantha Boyle',
    phoneNumber: '651676641',
    address: '106 Shea Circles',
    city: 'Pasco',
    ifNumber: '161236',
    tpNumber: '1000064701',
    iceNumber: '1000039948',
    type: 'auto-entrepreneur',
    bank: 'Al barid bank',
    rib: '1745477835869251',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/935.jpg',
    invoiceId: '5srya2bmsa'
  },
  {
    id: 'iuor12ns2j',
    name: 'Jaime Hodkiewicz',
    phoneNumber: '613282581',
    address: '438 Hellen Common',
    city: 'La Mirada',
    ifNumber: '100626',
    tpNumber: '1000058263',
    iceNumber: '1000051931',
    type: 'société',
    bank: 'Al barid bank',
    rib: '3799716139366886',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/11.jpg',
    invoiceId: 'h1m391eykp'
  },
  {
    id: 'avv15vzzi0',
    name: 'Sophia Franey Jr.',
    phoneNumber: '682454119',
    address: '8062 Bertrand Passage',
    city: 'Manteca',
    ifNumber: '112689',
    tpNumber: '1000062604',
    iceNumber: '1000079600',
    type: 'auto-entrepreneur',
    bank: 'Bank of Africa',
    rib: '4866736582043657',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/27.jpg',
    invoiceId: '903qx02usd'
  },
  {
    id: 'yw1hhwgnou',
    name: 'Patricia Glover',
    phoneNumber: '602371098',
    address: '16146 Deonte Dam',
    city: 'Davie',
    ifNumber: '153841',
    tpNumber: '1000038877',
    iceNumber: '1000032435',
    type: 'société',
    bank: 'Al barid bank',
    rib: '3001700131309399',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1196.jpg',
    invoiceId: 'lbb6uww2ht'
  },
  {
    id: 'escp17396a',
    name: 'Elizabeth Heaney',
    phoneNumber: '696196721',
    address: '50678 Ivy View',
    city: 'Schenectady',
    ifNumber: '117621',
    tpNumber: '1000018568',
    iceNumber: '1000043655',
    type: 'société',
    bank: 'CIH',
    rib: '3951832057647385',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/82.jpg',
    invoiceId: 'oecp0p2z8t'
  },
  {
    id: 'd924meg707',
    name: 'Joanne Donnelly',
    phoneNumber: '649520096',
    address: '658 Ola View',
    city: 'Wesley Chapel',
    ifNumber: '170393',
    tpNumber: '1000075352',
    iceNumber: '1000060425',
    type: 'auto-entrepreneur',
    bank: 'Al barid bank',
    rib: '6124668418897406',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/789.jpg',
    invoiceId: 'm4yojz3ebh'
  },
  {
    id: '73fiwiv80c',
    name: 'Michele Runolfsdottir',
    phoneNumber: '677368211',
    address: '088 Marlee Garden',
    city: 'Ceres',
    ifNumber: '174486',
    tpNumber: '1000000129',
    iceNumber: '1000015009',
    type: 'société',
    bank: 'Al barid bank',
    rib: '1092912321081692',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/337.jpg',
    invoiceId: '06mdwdkle3'
  },
  {
    id: 'gh0d7kdzt4',
    name: 'Nettie Hoppe',
    phoneNumber: '675310049',
    address: '36672 Farrell Ranch',
    city: 'Corpus Christi',
    ifNumber: '179491',
    tpNumber: '1000062705',
    iceNumber: '1000016584',
    type: 'auto-entrepreneur',
    bank: 'Al barid bank',
    rib: '1529760629230899',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1228.jpg',
    invoiceId: '4yn7ejj04e'
  },
  {
    id: 'x0qwtk9n7w',
    name: 'Elias Mraz',
    phoneNumber: '695911561',
    address: '78113 Bryon Brooks',
    city: 'Yuma',
    ifNumber: '169018',
    tpNumber: '1000021938',
    iceNumber: '1000043593',
    type: 'société',
    bank: 'Bank of Africa',
    rib: '7485993302909248',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/63.jpg',
    invoiceId: '3oll04renr'
  },
  {
    id: 'j3a6i82kv2',
    name: 'Brandon Wiza',
    phoneNumber: '645988551',
    address: '82815 Yvette Trace',
    city: 'Redlands',
    ifNumber: '140864',
    tpNumber: '1000087252',
    iceNumber: '1000067410',
    type: 'société',
    bank: 'Al barid bank',
    rib: '4528406589405012',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/332.jpg',
    invoiceId: 'w0wpavb8vk'
  },
  {
    id: 'mmp7p2zwfz',
    name: 'Mack Nicolas',
    phoneNumber: '646690430',
    address: '19779 Klein Branch',
    city: 'Sierra Vista',
    ifNumber: '136343',
    tpNumber: '1000006114',
    iceNumber: '1000004510',
    type: 'auto-entrepreneur',
    bank: 'Bank of Africa',
    rib: '4295697496042219',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/912.jpg',
    invoiceId: 'l77gf44cr9'
  },
  {
    id: 'p8yh31ikrs',
    name: 'Bryant Kerluke',
    phoneNumber: '613037127',
    address: '5870 Boyd Canyon',
    city: 'Sanford',
    ifNumber: '144384',
    tpNumber: '1000077450',
    iceNumber: '1000030759',
    type: 'société',
    bank: 'Bank of Africa',
    rib: '7300777170140285',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/292.jpg',
    invoiceId: '3w4g1sor3b'
  },
  {
    id: 'oz0pw8ms8a',
    name: 'Sam Kutch',
    phoneNumber: '673000915',
    address: '36049 Gulgowski Plains',
    city: 'Eden Prairie',
    ifNumber: '155241',
    tpNumber: '1000086902',
    iceNumber: '1000035346',
    type: 'société',
    bank: 'Al barid bank',
    rib: '9922452824500347',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1225.jpg',
    invoiceId: 'vxdth0yrut'
  },
  {
    id: 'dq16jhfugs',
    name: "Ms. Nellie O'Hara",
    phoneNumber: '656797143',
    address: '785 Noemie Motorway',
    city: 'Norfolk',
    ifNumber: '138962',
    tpNumber: '1000044799',
    iceNumber: '1000086944',
    type: 'société',
    bank: 'Al barid bank',
    rib: '4262936601396152',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1070.jpg',
    invoiceId: 's1ct3eog9j'
  },
  {
    id: 'x32bkjga7f',
    name: 'Alvin Parker',
    phoneNumber: '690753307',
    address: '5723 White Center',
    city: 'Ankeny',
    ifNumber: '133109',
    tpNumber: '1000020266',
    iceNumber: '1000083670',
    type: 'société',
    bank: 'CIH',
    rib: '4436411792952291',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/206.jpg',
    invoiceId: 'pi4l86lu9p'
  },
  {
    id: 'j343p0qts7',
    name: 'Marvin Mosciski',
    phoneNumber: '681936237',
    address: '28119 Abdul Trace',
    city: 'Minot',
    ifNumber: '185511',
    tpNumber: '1000016879',
    iceNumber: '1000082527',
    type: 'société',
    bank: 'CIH',
    rib: '5305592489673479',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/323.jpg',
    invoiceId: 'r0iekp47gr'
  },
  {
    id: '8cvrsmwogj',
    name: 'Marguerite Mosciski',
    phoneNumber: '605308374',
    address: '8488 Rempel Row',
    city: 'Decatur',
    ifNumber: '103834',
    tpNumber: '1000007272',
    iceNumber: '1000026169',
    type: 'société',
    bank: 'CIH',
    rib: '2984332313389756',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1005.jpg',
    invoiceId: 'pa6ietfmhs'
  },
  {
    id: '4esxwxt3w0',
    name: 'Mrs. Billie Mitchell',
    phoneNumber: '667552176',
    address: '9306 Klein Green',
    city: 'Spring',
    ifNumber: '187772',
    tpNumber: '1000018404',
    iceNumber: '1000034683',
    type: 'auto-entrepreneur',
    bank: 'Al barid bank',
    rib: '9710663198068685',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/615.jpg',
    invoiceId: 'dmb2dttlr1'
  },
  {
    id: 'fn27domgc0',
    name: 'Florence Schowalter',
    phoneNumber: '607154940',
    address: '807 Ullrich Course',
    city: 'Hartford',
    ifNumber: '106082',
    tpNumber: '1000028386',
    iceNumber: '1000091641',
    type: 'société',
    bank: 'Bank of Africa',
    rib: '2949281172903880',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1114.jpg',
    invoiceId: 'c2cneee9tq'
  },
  {
    id: 'y9irjmrfcn',
    name: 'Natalie Farrell',
    phoneNumber: '670519520',
    address: '459 Nitzsche Mill',
    city: 'Brockton',
    ifNumber: '158568',
    tpNumber: '1000080845',
    iceNumber: '1000035359',
    type: 'auto-entrepreneur',
    bank: 'Bank of Africa',
    rib: '7244082728573500',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/24.jpg',
    invoiceId: 'zbsiut7uyl'
  },
  {
    id: '9lards7jud',
    name: 'Brooke Bednar',
    phoneNumber: '612124421',
    address: '47572 Batz Cliffs',
    city: 'Inglewood',
    ifNumber: '171230',
    tpNumber: '1000035626',
    iceNumber: '1000073462',
    type: 'société',
    bank: 'Bank of Africa',
    rib: '6895908378893292',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/433.jpg',
    invoiceId: 'cj9q5drds1'
  },
  {
    id: 'tfxzz54han',
    name: 'Bernard Kozey I',
    phoneNumber: '612908744',
    address: '694 Favian Union',
    city: 'St. Louis Park',
    ifNumber: '122082',
    tpNumber: '1000039013',
    iceNumber: '1000039304',
    type: 'société',
    bank: 'Al barid bank',
    rib: '5847364047752311',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/829.jpg',
    invoiceId: 'qigwmpy5ta'
  },
  {
    id: 'mjldl52h8c',
    name: 'Jay Bayer',
    phoneNumber: '645605834',
    address: '9909 Braden Forges',
    city: 'Vallejo',
    ifNumber: '114801',
    tpNumber: '1000066662',
    iceNumber: '1000020261',
    type: 'société',
    bank: 'CIH',
    rib: '4229057707611799',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/457.jpg',
    invoiceId: '9pk4l61xkc'
  },
  {
    id: '1jmyf3qsq0',
    name: 'Kathryn Kuhn',
    phoneNumber: '668374003',
    address: '64054 Tromp Well',
    city: 'Tinley Park',
    ifNumber: '126995',
    tpNumber: '1000075902',
    iceNumber: '1000014967',
    type: 'auto-entrepreneur',
    bank: 'Al barid bank',
    rib: '6862508612050666',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/659.jpg',
    invoiceId: 'aipysds284'
  },
  {
    id: 'q14k1v3out',
    name: 'Dr. Alfred Erdman',
    phoneNumber: '657444064',
    address: '4407 Morar Heights',
    city: 'Nashua',
    ifNumber: '100753',
    tpNumber: '1000089127',
    iceNumber: '1000011629',
    type: 'société',
    bank: 'Al barid bank',
    rib: '7873814730793206',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/617.jpg',
    invoiceId: 'llqkysls7y'
  },
  {
    id: 'dit6jnox1z',
    name: 'Elias Mueller',
    phoneNumber: '670679614',
    address: '633 Mariela Skyway',
    city: 'Dubuque',
    ifNumber: '171223',
    tpNumber: '1000034319',
    iceNumber: '1000067247',
    type: 'société',
    bank: 'Al barid bank',
    rib: '4657927108173013',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/66.jpg',
    invoiceId: 'agk2hvwwpi'
  },
  {
    id: 'clazd1q75x',
    name: 'Miss Clifton Hansen',
    phoneNumber: '642055492',
    address: '133 Satterfield Terrace',
    city: 'Fargo',
    ifNumber: '122566',
    tpNumber: '1000046917',
    iceNumber: '1000005685',
    type: 'société',
    bank: 'Al barid bank',
    rib: '7372598034377097',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/765.jpg',
    invoiceId: '7r26b79re3'
  },
  {
    id: '26v9bikkxf',
    name: 'Ms. Lila Schamberger',
    phoneNumber: '617256757',
    address: '529 Wilfredo Underpass',
    city: 'Great Falls',
    ifNumber: '109479',
    tpNumber: '1000090391',
    iceNumber: '1000026080',
    type: 'société',
    bank: 'Al barid bank',
    rib: '5360240899217645',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/356.jpg',
    invoiceId: 'fk1zgn69yb'
  },
  {
    id: '6kfwqfo78a',
    name: 'Ms. Ted Schultz',
    phoneNumber: '693927473',
    address: '718 Braun Ridges',
    city: 'Ashburn',
    ifNumber: '100476',
    tpNumber: '1000098496',
    iceNumber: '1000079348',
    type: 'société',
    bank: 'CIH',
    rib: '2090424020554479',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/408.jpg',
    invoiceId: 'czmehzbcn4'
  },
  {
    id: 'inoqv0yzdo',
    name: 'Rhonda Brekke',
    phoneNumber: '698350961',
    address: '717 Walker Ranch',
    city: 'Wauwatosa',
    ifNumber: '137371',
    tpNumber: '1000039593',
    iceNumber: '1000021709',
    type: 'auto-entrepreneur',
    bank: 'CIH',
    rib: '2966062545592198',
    logoUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1071.jpg',
    invoiceId: '48gq88ieoh'
  }
];

const rowsPerPage = 12;

const useCompanies = (companyData, page) => {
  return useMemo(
    () => {
      return applyPagination(companyData, page - 1, rowsPerPage);
    },
    [page, companyData]
  );
};

const Page = () => {

  const [showAdd, setShowAdd] = useState(false);
  const [buttons, setButtons] = useState(["Cancel", "Save"]);
  const [title, setTitle] = useState("Add New Customer");
  const [companyData, setCompanyData] = useState(data);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [selectedId, setSelectedId] = useState(null);
  const [page, setPage] = useState(1);
  const companies = useCompanies(companyData, page);

  const count = Math.ceil(companyData.length / rowsPerPage);


  const initialValues = {
    name: '',
    logoUrl: '',
    type: '',
    phoneNumber: '',
    city: '',
    address: '',
    ifNumber: '',
    iceNumber: '',
    tpNumber: '',
    bank: 'CIH',
    rib: '',
    submit: null
  }

  const add = async (values) => {
    try {
      const { data } = await axios.post('/api/create', {
        table: "company",
        ...values
      });
      setCompanyData(prev => [...prev, data]);
      dispatch({
        type: "CREATE_COMPANY",
        data
      });
      enqueueSnackbar(`${data.name} was added successfuly`, { variant: "success" });

      setShowAdd(false);
    } catch (err) {
      enqueueSnackbar(err?.response.data.message || err.message, { variant: "error" });
    }
  }


  const update = async (values) => {

    try {
      const { data } = await axios.post('/api/update', {
        table: "company",
        where: {
          id: values.id
        },
        data: values
      });

      setCompanyData(prev => prev.map(customer => { return (customer.id === id) ? data : customer }));

      dispatch({
        type: "UPDATE_COMPANY",
        data
      })

      enqueueSnackbar(`${data.name} was updated successfuly`, { variant: "success" });

      setShowAdd(false);
    } catch (err) {
      enqueueSnackbar(err?.response.data.message || err.message, { variant: "error" });
    }
  }

  const uploadAvatar = async (values) => {
    const formData = new FormData();
    console.log("run");
    formData.append("avatar", values.logoUrl);
    try {
      const { data } = await axios.post('/api/upload-avatar', formData);
      console.log(data);
      values.logoUrl = data.filePath;
      return values;
    } catch (err) {
      console.log(err.message);
      throw new Error('image upload failed')
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      name: Yup
        .string()
        .max(100)
        .matches(/\w+/i)
        .required()
      ,
      type: Yup
        .string()
        .required(),
      phoneNumber: Yup
        .string()
        .max(9)
        .min(9)
        .matches(/\d+/i)
        .required(),
      city: Yup
        .string()
        .required(),
      address: Yup
        .string()
        .required(),
      tpNumber: Yup
        .string()
        .matches(/\w{4,}/i)
        .required()
      ,
      iceNumber: Yup
        .string()
        .matches(/\d{10}/i)
        .required()
      ,
      ifNumber: Yup
        .string()
        .matches(/\d{10}/i)
        .required()
      ,
      logoUrl: Yup
        .mixed()
      ,
      bank: Yup
        .string()
        .required()
      ,
      rib: Yup
        .string()
        .matches(/\d{16}/i)
        .required()
      ,

    }),
    onSubmit: async (values) => {
      console.log(values);
      uploadAvatar(values).then(async (values) => {
        const apiFunction = selectedId ? update : add;
        await apiFunction(values);
      });
    }
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    closeSnackbar();
    formik.handleSubmit();
  }

  const Fields = [
    {
      name: "stack",
      childs: [
        {
          label: "Ajouter un Logo",
          name: "logoUrl"
        },
        {
          name: "stack",
          childs: [
            {
              label: "Raison Social",
              name: "name"
            },
            {
              label: "Type",
              name: "type",
              options: ['société', 'auto-entrepreneur'],
            }
          ],
          addedProps: {
            direction: "column"
          }
        }
      ]
    },
    {
      name: "stack",
      childs: [
        {
          label: "Siége Social",
          name: "city"
        },
        {
          label: "Address",
          name: "address"
        }
      ]
    },
    {
      name: "stack",
      childs: [
        {
          label: "Numéro de Telephone",
          name: "phoneNumber"
        }
      ]
    },
    {
      name: "stack",
      childs: [
        {
          label: "TP",
          name: "tpNumber"
        },
        {
          label: "IF",
          name: "ifNumber"
        }
      ]
    },
    {
      name: "stack",
      childs: [
        {
          label: "N° de Compte Bancaire",
          name: "rib",
          options: ['CIH', 'Al barid bank', 'Bank of Africa'],
        }
      ]
    },
    {
      name: "stack",
      childs: [
        {
          label: "ICE",
          name: "iceNumber"
        }
      ]
    }
  ]

  const ADDProps = {
    handleSubmit,
    buttons,
    open: showAdd,
    title,
    setOpen: setShowAdd,
    Fields,
    formik
  }

  const handleEdit = async (company) => {
    setShowAdd(true);
    setSelectedId(company.id);
    formik.setValues(company, true);
    setButtons(["Discard", "Update"]);
    setTitle("Update Company Info");
  }

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Companies
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={() => { setShowAdd(prev => !prev); formik.setValues(initialValues); setButtons(["Cancel", "Save"]); setTitle("Add New Company"); setSelectedId(null) }}
                >
                  Add
                </Button>
                <AddPopup {...ADDProps} />
              </div>
            </Stack>
            <FilterCompanies {...{ data, setCompanyData, setPage }} />
            <Grid
              container
              spacing={3}
            >
              {companies.map((company) => (
                <Grid
                  xs={12}
                  md={6}
                  lg={3}
                  key={company.id}
                >
                  <CompanyCard {...{ company, handleEdit, setCompanyData }} />
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Pagination
                count={count}
                onChange={(e, page) => setPage(page)}
                page={page}
                size="small"
              />
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

/* export async function getStaticProps() {
  const res = await prisma.company.findMany();
  const data = JSON.parse(JSON.stringify(res));
  return {
    props: { data }
  }
} */

export default Page;
