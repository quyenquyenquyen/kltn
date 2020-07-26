// import quillBetterTable from 'quill-better-table'
// import Quill from 'quill'

// Quill.register({
//   'modules/better-table': quillBetterTable
// }, true)

// window.onload = () => {
//   const quill = new Quill('#editor', {
//     theme: 'snow',
//     modules: {
//       table: false,
//       'better-table': {
//         operationMenu: {
//           items: {
//             unmergeCells: {
//               text: 'Another unmerge cells name'
//             }
//           },
//           color: {
//             colors: ['green', 'red', 'yellow', 'blue', 'white'],
//             text: 'Background Colors:'
//           }
//         }
//       },
//       keyboard: {
//         bindings: quillBetterTable.keyboardBindings
//       }
//     }
//   })

//   let tableModule = quill.getModule('better-table')
//   document.body.querySelector('#insert-table')
//     .onclick = () => {
//       tableModule.insertTable(3, 3)
//     }

//   document.body.querySelector('#get-table')
//     .onclick = () => {
//       console.log(tableModule.getTable())
//     }
  
//   document.body.querySelector('#get-contents')
//     .onclick = () => {
//       updateDeltaView(quill)
//     }
// }

// function updateDeltaView (quill) {
//   document.body.querySelector('#delta-view')
//     .innerHTML = JSON.stringify(
//       quill.getContents()
//     )
// }
