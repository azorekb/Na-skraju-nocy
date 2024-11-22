const TEXTS =
{
    languages: ['polski', 'english'],
    lists:
    {
        species: 
        [
            ['Smok','Dragon'],
            ['Smoczór', 'Drake'],
            ['Wywerna', 'Wywern'],
            ['Bazyliszek', 'Basilisk'],
            ['Hydra', 'Hydra'],
            ['Wyrm', 'Wyrm'],
            ['Lung', 'Lung'],
            ['Mantria', 'Mantra'],
            ['Żmij', 'viper'],
            ['Lewiatan', 'Leviathan'],
            ['Ćmok', 'Mothagon'],
            ['Kirin', 'Kirin']
            ['Baśniosmok', 'Faerie']
        ],
        elements:
        [
            ['ogień', 'fire'],
            ['powietrze', 'air'],
            ['ziemia', 'ground'],
            ['natura', 'nature'],
            ['woda', 'water'],
            ['eter', 'ether'],
            ['śmierć', 'death'],
            ['dusza', 'soul'],
            ['ciało', 'body'],
            ['umysł', 'mind'],
            ['chaos', 'chaos'],
            ['ład', 'order'],
            ['glina', 'clay'],
            ['kryształ', 'crystyal'],
            ['magma', 'magma'],
            ['piasek', 'sand'],
            ['błyskawica', 'lightning'],
            ['mrok', 'dark'],
            ['iryzacja', 'iridescence'],
            ['mgła', 'fog'],
            ['lód', 'ice'],
            ['burza', 'storm'],
            ['metal', 'metal'],
            ['światło', 'light'],
            ['spaczenie', 'distortion'],
            ['kościej', 'koshchey'],
            ['upiór', 'phantom'],
            ['widmo', 'spectrum'],
            ['noc', 'night'],
            ['zenit', 'zenith'],
            ['brzask', 'dawn'],
            ['zmierzch', 'dusk']
        ],
        itemsCategories:
        [
            {// 0
                categoryName: ['kamienie filozoficzne', 'philosopher\'s stones'],
                items: 
                [
                    {// 0
                        itemName: ['nieudany kamień filozoficzny', 'unsuccessful philosopher\'s stone'],
                    },
                    {// 1
                        itemName: ['zwykły kamień filozoficzny', 'regular philosopher\'s stone'],
                    },
                    {// 2
                        itemName: ['doskonały kamień filozoficzny', 'perfect philosopher\'s stone'],
                    },
                    {// 3
                        itemName: ['spaczony kamień filozoficzny', 'distorted philosopher\'s stone'],
                    },
                ]                    
            }
        ],
        buildings:
        [
            {
                building: ['twierdza', 'fortress'],
                rooms:
                [
                    ['hala hodowców', 'breeders\' hall']
                ],
                img: 'img/fortress.webp'
            },
            {
                building: ['akademia', 'academy'],
                rooms:
                [
                    ['żłobek', 'nursery']
                ],
                img: 'img/academy.webp'
            },
            
        ]
    },
    start:
    {
        money: 
        [
            ["miedziaki", "coppers"],
            ["srebrniki", "silver"],
            ["złotówki", "gold"]
        ],
        buttons:
        [
            ["smoki", "dragons"],
            ["skarbiec", "treasury"],
            ["gród", "castle"],
            ["dzicz", "wilderness"]
        ],
    },
    firstAdoption:
    {
        names:
        [
            ['Smocza Piastunka', 'Dragons\' Guardian'],
            ['Piastun Hodowców', 'Breeders\' Guardian']
        ],
        dialogue:
        [
            ['Witaj przybyszu,\n\nWłaśnie dołączyłeś do elitarnego grona Hodowców Smoków. Po przejściu Rytuału Krwii został ci już tylko jeden krok do wykonania: wybór swego pierwszego Chowańca.', 'translating in progress...'],
            ['Cóż to będzie?\n\nPotężny Smoczór łamiący kości swym opancerzonym ogonem? Lekka i zwrotna Wywerna pomocna w dalekiej podróży? A może Smok łączący w sobie wiele cech wyżej wymienionych smokowatych?', 'translating in progress...'],
            ['To są smocze jaja, z pośród których możesz wybrać swojego pierwszego towarzysza:', 'translating in progress...'],
            ['Wybierz płeć i imię swojego towarzysza:', 'translating in progress...'],
            ['Gratuluję!\n\nPrzygarnąłeś swojego\nPierwszego Chowańca!', 'translating in progress...'],
            ['Powodzenia Hodowco.\n\nUdam się teraz do Smoczej Akademii, aby zająć się tamtejszym Żłobkiem. Jeśli będziesz chciał przygarnąć więcej Chowańców, udaj się tam i pytaj o mnie.', 'translating in progress...'],
            ['Zaczekaj Hodowco!\nZanim odejdziesz, możesz zadać mi parę pytań. Chętnie pomogę Ci rozeznać się w Twoich nowych możliwości jak i obowiązkach. Znam wszystkich osiadłych mieszkańców Mirgrodu oraz wiele opowieści z otaczającego nas boru. Jeśli jednak Ci się śpieszy, pamiętaj, że zawse znajdziesz mnie tutaj w Twierdzy.', 'translating in progress...']
        ],
        settings:
        [
            {who: 1, button: 0},
            {who: 1, button: 0},
            {who: 0, button: 1},
            {who: 0, button: 2},
            {who: 0, button: 0},
            {who: 0, button: 3},
            {who: 1, button: 4}
        ],
        end: ['zakończ', 'finish'],
        starterStonesAmount: 5
    },
    itemList:
    {
        dragonsEggs:
        [
            {
                optionName: ['powiąż', 'connect'],
                subOptions:
                [
                    {
                        type: 'item',
                        value: [0,1]
                    },
                    {
                        type: 'item',
                        value: [0,2]
                    },
                    {
                        type: 'item',
                        value: [0,3]
                    },
                ]
            },
        ]
    },
    connectionStatus:
    {
        successConnectDragon: ['Gratulacje, [name] stał[a] się twoim chowańcem.', 'Congrats, [name] became your familiar.'],
        noDragons: [' jest już twoim chowańcem.', ' is already your familiar'],
        noStone: ['Nie posiadasz danego typu Kamienia Filozofów.', 'You don\'t have the type of Philosopher\'s Stone'],
    },
    genderEnds: [['', 'a'], ['', '']],
    userSettings: 
    [
        {
            category: ['konto', 'account'],
            options:
            [
                {
                    option: ['nazwa publiczna', 'public name'],
                    table: 'nickname',
                    type: 'text',
                    limit: 100
                },
                {
                    option: ['obrazek profilowy', 'profile picture'],
                    table: 'avatar',
                    type: 'text',
                    hint: ['wpisz adres obraska','enter picture address']
                },
                {
                    option: ['język', 'language'],
                    table: 'language',
                    type: 'select',
                    values: 
                    [
                        ['polski', 'polski'],
                        ['english', 'english']
                    ]
                }
            ]
        },
        {
            category: ['wygląd', 'view'],
            options:[]
        }
    ],
    send: ['wyślij', 'send'],
}

const FILES =
{
    logo: '../img/logo_v1.webp',
    wildMap: 'img/damap.webp',
    breedersHall: 'img/breeders_hall.webp',
    dragonsChoose: ['img/draconis_draco_egg.webp', 'img/draconis_drake_egg.webp', 'img/draconis_wywern_egg.webp'],
    loading: 'img/moon-phases.webp',
    defaultAvatar: 'img/avatars/763932044056199238.png'
}

const DRAGON_RANDOM = 
[
    [0, 1, 2],
    [0, 2],
    [0, 1]
]

function getItemCategoryIdByName(_name)
{
    let category = -1;
    for(let i = 0; i < TEXTS.lists.itemsCategories.length; i++)
        if(TEXTS.lists.itemsCategories[i].categoryName[ENGLISH] == _name)
            category = i;
    return category;
}

function getItemTypeIdByName(_name)
{
    let type = -1;
    for(let i = 0; i < TEXTS.lists.itemsCategories.length; i++)
        for(let j = 0; j < TEXTS.lists.itemsCategories[i].items.length; j++)
            if(TEXTS.lists.itemsCategories[i].items[j].itemName[ENGLISH] == _name)
                type = i;
    return type;
}

function getDragonElementByPolishName(_name)
{
    for(let i = 0; i < TEXTS.lists.elements.length; i++)
        if(TEXTS.lists.elements[i][POLISH] == _name)
            return i;
    return -1;
}

function dragonsMixElements(e1, e2)
{
    if(e1 == e2)
        return [e1];
    if(e1 > e2)
    {
        const temp = e1;
        e1 = e2;
        e2 = temp;
    }

    if(e1 == 0 && e2 == 1) return [0, 1, 16, 18, 23];
    if(e1 == 0 && e2 == 2) return [0, 2, 13, 14, 22];
    if(e1 == 0 && e2 == 3) return [0, 3, 6, 7];
    if(e1 == 0 && e2 == 4) return [0, 4, 17, 18, 19];
    if(e1 == 0 && e2 == 5) return [0, 5, 7, 10, 11];
    if(e1 == 1 && e2 == 2) return [1, 2, 15, 16];
    if(e1 == 1 && e2 == 3) return [1, 3, 7];
    if(e1 == 1 && e2 == 4) return [1, 4, 19, 20, 21];
    if(e1 == 1 && e2 == 5) return [1, 5, 10, 11];
    if(e1 == 2 && e2 == 3) return [1, 3, 8];
    if(e1 == 2 && e2 == 4) return [2, 4, 3, 12, 13];
    if(e1 == 2 && e2 == 5) return [2, 5, 8, 10, 11];
    if(e1 == 3 && e2 == 4) return [4, 3, 9];
    if(e1 == 3 && e2 == 5) return [5, 3, 7, 9, 10, 11];
    if(e1 == 4 && e2 == 5) return [4, 5, 10, 11];
}