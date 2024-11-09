const TEXTS =
{
    lists:
    {
        species: 
        [
            ['Smok','Draco'],
            ['Smoczór', 'Drake'],
            ['Wywerna', 'Wywern']
        ],
        elements:
        [
            ['ogień', 'fire'],
            ['powietrze', 'air'],
            ['ziemia', 'ground']
        ],
        itemsCategories:
        [
            {// 0
                categoryName: ['kamienie filozoficzne', 'philosopher\'s stones'],
                items: 
                [
                    {// 0
                        itemName: ['zwykły kamień filozoficzny', 'regular philosopher\'s stone']
                    }
                ]                    
            }
        ],
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
    }
}

const FILES =
{
    logo: '../img/logo_v1.webp',
    wildMap: 'img/damap.webp',
    breedersHall: 'img/breeders_hall.webp',
    dragonsChoose: ['img/draconis_draco_egg.webp', 'img/draconis_drake_egg.webp', 'img/draconis_wywern_egg.webp'],
    loading: 'img/moon-phases.webp'
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