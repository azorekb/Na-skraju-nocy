const TEXTS =
{
    languages: ['polski', 'english'],
    lists:
    {
        species: 
        [
            {
                thename: ['Smok Właściwy','Proper Dragon'],
                stats: [5, 0, 5, -2, 0, -8, 5, 0],
                favfud: 6
            },
            {
                thename: ['Smoczór', 'Drake'],
                stats: [5, 10, 0, -5, 0, -10, 5, 0],
                favfud: 2
            },
            {
                thename: ['Wywerna', 'Wywern'],
                stats: [0, -5, 5, 3, 0, 2, 0, 0],
                favfud: 3
            },
            {
                thename: ['Bazyliszek', 'Basilisk'],
                favfud: 1
            },
            {
                thename: ['Hydra', 'Hydra'],
                favfud: 4
            },
            {
                thename: ['Wyrm', 'Wyrm'],
                favfud: 6
            },
            {
                thename: ['Lung', 'Lung'],
                favfud: 8
            },
            {
                thename: ['Mantria', 'Mantra'],
                favfud: 5
            },
            {
                thename: ['Żmij', 'Zmey'],
                favfud: 3
            },
            {
                thename: ['Lewiatan', 'Leviathan'],
                favfud: 4
            },
            {
                thename: ['Ćmok', 'Mothagon'],
                favfud: 2
            },
            {
                thename: ['Kirin', 'Kirin'],
                favfud: 1
            },
            {
                thename: ['Baśniosmok', 'Faerie'],
                favfud: 7
            },
        ],
        elements:
        [
            {
                thename: ['ogień', 'fire'],
                symbol: '&#9651;',
                stats: [0, 0, 0, 5, 0, 0, 3, 0]
            },
            {
                thename: ['powietrze', 'air'],
                symbol: '<s>&#9651;</s>', //'&#128769;'
                stats:[-10, 0, 15, 0, 3, 0, 0, 0]
            },
            {
                thename: ['ziemia', 'earth'],
                symbol: '<s>&#9947;</s>', //'&#128771;'
                stats: [3, 15, -10, 0, 0, 0, 0, 0]
            },
            {
                thename: ['natura', 'nature'],
                symbol: '&#10753;',
                stats: [0, -5, 0, 0, 0, 0, 10, 3]
            },
            {
                thename: ['woda', 'water'],
                symbol: '&#9947;',
                stats: [0, 0, 3, 0, 0, 5, 0, 0]
            },
            {
                thename: ['eter', 'ether'],
                symbol: '&#9775;',
                stats: [1, 1, 1, 1, 1, 1, 1, 1]
            },
            {
                thename: ['śmierć', 'death'],
                symbol: ''
            },
            {
                thename: ['dusza', 'soul'],
                symbol: ''
            },
            {
                thename: ['ciało', 'body'],
                symbol: ''
            },
            {
                thename: ['umysł', 'mind'],
                symbol: ''
            },
            {
                thename: ['chaos', 'chaos'],
                symbol: ''
            },
            {
                thename: ['ład', 'order'],
                symbol: ''
            },
            {
                thename: ['glina', 'clay'],
                symbol: ''
            },
            {
                thename: ['kryształ', 'crystyal'],
                symbol: ''
            },
            {
                thename: ['magma', 'magma'],
                symbol: ''
            },
            {
                thename: ['piasek', 'sand'],
                symbol: ''
            },
            {
                thename: ['błyskawica', 'lightning'],
                symbol: ''
            },
            {
                thename: ['mrok', 'dark'],
                symbol: ''
            },
            {
                thename: ['iryzacja', 'iridescence'],
                symbol: ''
            },
            {
                thename: ['mgła', 'fog'],
                symbol: ''
            },
            {
                thename: ['lód', 'ice'],
                symbol: ''
            },
            {
                thename: ['burza', 'storm'],
                symbol: ''
            },
            {
                thename: ['metal', 'metal'],
                symbol: ''
            },
            {
                thename: ['światło', 'light'],
                symbol: ''
            },
            {
                thename: ['spaczenie', 'distortion'],
                symbol: ''
            },
            {
                thename: ['kościej', 'koshchey'],
                symbol: ''
            },
            {
                thename: ['upiór', 'ghul'],
                symbol: ''
            },
            {
                thename: ['widmo', 'spectrum'],
                symbol: ''
            },
            {
                thename: ['noc', 'night'],
                symbol: ''
            },
            {
                thename: ['zenit', 'zenith'],
                symbol: ''
            },
            {
                thename: ['brzask', 'dawn'],
                symbol: ''
            },
            {
                thename: ['zmierzch', 'dusk'],
                symbol: ''
            },
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
                        itemName: ['spaczony kamień filozoficzny', 'corrupted philosopher\'s stone'],
                    },
                ]                    
            },
            {// 1
                categoryName: ['kocioły', 'cauldrons'],
                items:
                [
                    {// 0
                        itemName: ['mosiężny kocioł', 'brass cauldron'],
                    },
                    {// 1
                        itemName: ['miedziany kocioł', 'copper cauldron'],
                    },
                    {// 2
                        itemName: ['żelazny kocioł', 'iron cauldron'],
                    },
                    {// 3
                        itemName: ['brązowy kocioł', 'bronze cauldron'],
                    },
                    {// 4
                        itemName: ['srebrny kocioł', 'silver cauldron'],
                    },
                    {// 5
                        itemName: ['złoty kocioł', 'gold cauldron'],
                    },
                ]
            },
            {// 2
                categoryName: ['składniki spożywcze', 'food ingredients'],
                items:
                [
                    {// 0
                        itemName: ['woda', 'water'],
                    },
                    {// 1
                        itemName: ['roślinne', 'plant'],
                        variants: 
                        [
                            {// 0
                                varname: ['cukrowe korzonki', 'sugar roots'],
                            },
                            {// 1
                                varname: ['pszenica', 'wheat'],
                            },
                            {// 2
                                varname: ['żyto', 'rye'],
                            },
                            {// 3
                                varname: ['owies', 'oat'],
                            },
                            {// 4
                                varname: ['kukurydza', 'corn'],
                            },
                            {// 5
                                varname: ['ziemniak', 'potato'],
                            },

                        ],
                        raises: 2
                    },
                    {// 2
                        itemName: ['czerwone mięso', 'red meat'],
                        variants:
                        [
                            {// 0
                                varname: ['wołowina', 'beef']
                            },
                            {// 1
                                varname: ['baranina', 'mutton']
                            },
                            {// 2
                                varname: ['kozina', 'goat']
                            },
                            {// 3
                                varname: ['dziczyzna', 'venison']
                            }
                        ],
                        raises: 7
                    },
                    {// 3
                        itemName: ['mięso drobiowe', 'poultry meat'],
                        variants:
                        [
                            {// 0
                                varname: ['kurczak', 'chicken'],
                            },
                            {// 1
                                varname: ['gęś', 'goose'],
                            },
                            {// 2
                                varname: ['kaczka', 'duck'],
                            }
                        ],
                        raises: 1
                    },
                    {// 4
                        itemName: ['ryba', 'fish'],
                        variants:
                        [
                            {// 0
                                varname: ['pstrąg', 'trout'],
                            },
                            {// 1
                                varname: ['łosoś', 'salmon'],
                            },
                            {// 2
                                varname: ['karp', 'carp'],
                            }
                        ],
                        raises: 6
                    },
                    {// 5
                        itemName: ['grzyb', 'mushroom'],
                        variants:
                        [
                            {// 0
                                varname: ['pieczarka', 'mushrooms'],
                            },
                            {// 1
                                varname: ['borowik', 'boletus'],
                            },
                            {// 2
                                varname: ['kurka', 'chanterelle'],
                            },
                            {// 3
                                varname: ['maślak', 'butterfish'],
                            }
                        ],
                        raises: 5
                    },
                    {// 6
                        itemName: ['kryształ', 'crystal'],
                        variants:
                        [
                            {
                                varname: ['kwarc', 'quartz'],
                            }
                        ],
                        raises: 8
                    },
                    {// 7
                        itemName: ['wyrób piekarniczy', 'bakery product'],
                        variants:
                        [
                            {// 0
                                varname: ['chleb', 'bread']
                            },
                            {// 1
                                varname: ['rogalik', 'croissant']
                            },
                            {// 2
                                varname: ['pączek', 'donut']
                            },
                        ],
                        raises: 3
                    },
                    {// 8
                        itemName: ['miód', 'honey'],
                        raises: 4
                    },
                    {// 9
                        itemName: ['zioła i przyprawy', 'herbs and spices'],
                        variants:
                        [
                            {// 0
                                varname: ['mięta', 'mint']
                            },
                            {// 1
                                varname: ['sól', 'salt']
                            },
                        ]
                    },
                    {// 10
                        itemName: ['nabiał', 'dairy'],
                        variants:
                        [
                            {// 0
                                varname: ['krowie mleko', 'cow milk']
                            },
                            {// 1
                                varname: ['ser żółty', 'yellow cheesee']
                            },
                            {// 2
                                varname: ['śmietana', 'cream']
                            },
                        ]
                    }
                ]
            }
        ],
        buildings:
        [
            {
                building: ['twierdza', 'fortress'],
                rooms:
                [
                    ['hala hodowców', 'keepers\' hall']
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
            ["gród", "town"],
            ["dzicz", "wilderness"]
        ],
    },
    firstAdoption:
    {
        names:
        [
            ['Smocza Piastunka', 'Dragons\' Guardian'],
            ['Piastun Hodowców', 'Keepers\' Guardian']
        ],
        dialogue:
        [
            ['Witaj przybyszu,\n\nWłaśnie dołączyłeś do elitarnego grona Hodowców Smoków. Po przejściu Rytuału Krwii został ci już tylko jeden krok do wykonania: wybór swego pierwszego Chowańca.', 'Welcome, Newcomer,\n\nYou have just joined the elite ranks of Dragon Keepers. After completing the Blood Ritual, there is only one step left to take: choosing your first Familiar."'],
            ['Cóż to będzie?\n\nPotężny Smoczór łamiący kości swym opancerzonym ogonem? Lekka i zwrotna Wywerna pomocna w dalekiej podróży? A może Smok łączący w sobie wiele cech wyżej wymienionych smokowatych?', 'Who will it be?\n\nA mighty drake breaking bones with its armored tail? Light and agile Wyvern helpful on long journeys? Or maybe a dragon combining many features of the above-mentioned dragon-kins?'],
            ['To są smocze jaja, z pośród których możesz wybrać swojego pierwszego towarzysza:', 'These are the dragon eggs from which you can choose your first companion:'],
            ['Wybierz płeć i imię swojego towarzysza:', 'Choose your companion\'s sex and name:'],
            ['Gratuluję!\n\nPrzygarnąłeś swojego\nPierwszego Chowańca!', 'Congratulations!\n\nYou have adopted your\nFirst Familiar!'],
            ['Powodzenia Hodowco.\n\nUdam się teraz do Smoczej Akademii, aby zająć się tamtejszym Żłobkiem. Jeśli będziesz chciał przygarnąć więcej Chowańców, udaj się tam i pytaj o mnie.', 'Good luck, Keeper.\n\nI will now head to the Dragon Academy to tend to the Nursery there. If you wish to adopt more Familiars, head there and ask for me.'],
            ['Zaczekaj Hodowco!\nZanim odejdziesz, możesz zadać mi parę pytań. Chętnie pomogę Ci rozeznać się w Twoich nowych możliwości jak i obowiązkach. Znam wszystkich osiadłych mieszkańców Mirgrodu oraz wiele opowieści z otaczającego nas boru. Jeśli jednak Ci się śpieszy, pamiętaj, że zawse znajdziesz mnie tutaj w Twierdzy.', 'Wait, Keeper!\n\nBefore you go, you might want to ask me a few questions. I will be happy to help you get to know your new possibilities and responsibilities. I know all the settled residents of Mirgród and many stories from the forest surrounding us. However, if you are in a hurry, remember that you will always find me here in the Fortress.']
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
                optionName: ['powiąż', 'bind'],
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
    genderEnds: [['', ''], ['a', '']],
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
    dragons:
    {
        title: ['smoki', 'dragons'],
        care: ['pielęgnuj', 'care'],
        options:
        [
            ['podgląd', 'preview'],
            ['statystyki', 'statistics'],
            ['dieta', 'diet'],
            ['doświadczenie', 'expirience'],
            ['ekwipunek', 'equipment'],
            ['rozród', 'generation'],
            ['smocza ramka', 'dragon frame']
        ],
        stats:
        [
            ['poziom', 'level'],
            ['siła', 'strength'],
            ['odporność', 'resistance'],
            ['zwinność', 'agility'],
            ['wzrok', 'sight'],
            ['inteligencja', 'intelligence'],
            ['mądrość', 'wisdom'],
            ['upór', 'obstinacy'],
            ['szczęście', 'luck']
        ],
        statsDetails:
        [
            ['suma', 'sum'],
            ['dieta', 'diet'],
            ['kamień', 'stone'],
            ['gatunek', 'species'],
            ['żywioł', 'element'],
            ['szkolenie', 'training'],
            ['ekwipunek', 'equipment']
        ],
        frameOptions:
        [
            ['podgląd', 'preview'],
            ['statystyki', 'statistics'],
            ['żywienie', 'nutrition'],
            ['doświadczenie', 'expirience'],
            ['ekwipunek', 'equipment'],
            ['rodzina', 'family'],
        ],
    },
    wilderness:
    {
        time: ['czas podróży', 'travel time'],
        hours: ['godzin(y)', 'hours'],
        travels: 
        [
            {
                travel: ['brak', 'none'],
                description: ['', '']
            },
            {
                travel: ['Ropiejące Bagna', 'Festering Swamps'],
                description: ['Ropiejące Bagna dostały swą nazwę od złóż ropy. Teren jest raczej toksyczny, ale za to bezpieczny, dlatego to dobre miejsce do rozpoczęcia przygody dla młodych smoków. Poza wymienionymi złożami można odnaleźć zioła, grzyby, oraz niedużą zwierzynę jak małe płazy czy ptaki.', 'translating in progress...']
            }
        ]
    }
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