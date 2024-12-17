//---------------------------------------------------------------------------------------------------------------------------
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