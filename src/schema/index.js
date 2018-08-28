/* eslint-disable */
import { schema } from 'normalizr';


const list = new schema.Entity('list', {}, {
  idAttribute: 'id'
});

const mymusicdata = new schema.Entity('mymusicdata',{
  list: [list]
},{
  idAttribute:'e'
})
export const MYMUSICDATA = [ mymusicdata ];


// const listr = new schema.Entity('list', {}, {
//   idAttribute: 'id'
// });


// export const LISTR = [ listr ];
export const LIST = ({list: [list]});