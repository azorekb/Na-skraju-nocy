// const test = 
// {
//     texts:
//     {
//         buttons: 
//         [
//             ['lista użytkowników', 'usernames\' list'],
//             ['wszystkie teksty i języki', 'all texts and languages'],
//             // ['lokalna baza danych', 'local database']
//         ],
//         testTitle: ['menu testu', 'test menu']
//     }
// }

// function test_users(res)
// {
//     windowSettings('max-content', 'max-content');
//     gameWindow = document.getElementById('gameWindow');
//     const table = newElement('table', gameWindow, 'testTable');

//     const cols = Object.keys(res[0]);

//     for(let i = -1; i < res.length; i++)
//     {
//         const row = table.insertRow(i + 1);
//         for(let j = 0; j < cols.length; j++)
//         {
//             const cell = row.insertCell(j);
//             if(i == -1)
//                 cell.innerText = cols[j];
//             else
//             {
//                 switch(cols[j])
//                 {
//                     case 'avatar': cell.innerHTML = '<img src = "' + res[i][cols[j]] + '" style = "width: 30px">'; break;
//                     case 'language': cell.innerText = TEXTS.languages[res[i][cols[j]]]; break;
//                     default: cell.innerHTML = res[i][cols[j]];
//                 }
//             }
//         }
//     }
// }

// function test_texts()
// {
//     windowSettings('max-content', 'max-content');
//     gameWindow = document.getElementById('gameWindow');
//     const table = newElement('table', gameWindow, 'testTable');
//     test_readTexts(TEXTS, table, '');
// }

// function test_readTexts(object, table, path)
// {
//     switch(typeof(object))
//     {
//         case 'object':
//             const objs = Object.keys(object);
//             for(let i = 0; i < objs.length; i++)
//             {
//                 if(typeof(object[objs[i]]?.[0]) == 'string' && typeof(object[objs[i]]) == 'object')
//                 {
//                     const row = table.insertRow(table.rows.length);
//                     for(let j = 0; j < object[objs[i]].length; j++)
//                     {
//                         row.insertCell(j).innerText = object[objs[i]][j];
//                     }
//                     row.insertCell(0).innerHTML = path + objs[i];
//                 }
//                 else
//                     test_readTexts(object[objs[i]], table, path + objs[i] + ' &#129170; ');
//             }
//         break;
//     }
// }