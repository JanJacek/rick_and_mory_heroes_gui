
// export async function sendList(item:object):Promise<void>{
//     await fetch('http://127.0.0.1:3333/applist',{
//         method:'POST',
//         body: JSON.stringify(item),
//         headers:{
//             'Content-type':'application/json'
//         }
//     } );

// }

// // export interface Human {
// //     name: string,
// //     age: number,
// //     email?: string
// // };

// export interface RnMcharacter{ 
//     id: number,
//     image: string,
//     name: string,
// };

// // export async function askForList():RnMcharacter {
// //    return await fetch('http://127.0.0.1:3333/applist').then((res) => res.json()) 
// // }

// export async function askForList(){
//   const res = await fetch('http://127.0.0.1:3333/applist');
//   console.log('hahhahaha', res)
// //   const { data }: { data: RnMcharacter } = await res.json();
//   return res;
// }

export async function grabList(){
  const res  = await fetch('http://localhost:333/heroes');
  if(!res.ok){console.log('res do obróbki ',res.statusText)}
  return await res.json()
} 
