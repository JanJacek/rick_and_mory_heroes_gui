<template>
<q-page class="q-ma-xl">
    <q-table
        dark
        :loading="loading"
        :rows="heroesDplay"
        title="Welcome to the one of the many universe"
        class="q-pa-md bg-brand text-white image "
        :columns="columns"
        separator="none"
        :pagination="pagination"
        :rows-per-page-options="[5,10,20,0]"
    >
    <template #top-row>
        <q-td style="display:block">
        <q-badge color="grey-8">
        Chose range: {{ 1 }} to {{ 100 }}
        </q-badge>
        <div>
            <!-- jj place for range filter -->
            <q-range
                v-model="snap"
                :min="0"
                :max="100"
                :step="1"
                label
                
                @update:model-value="onFilters()" 
            ></q-range>
        </div>
        </q-td>
        <q-td>
            <!-- jj search filter -->
            <q-input  
                dense debounce="400" 
                v-model="search" 
                dark color="white" 
                label="Find character"
                @update:model-value="onFilters()" 
            >
                <template v-slot:append>
                    <q-icon name="search" color="white" />
                </template>
            </q-input>
        </q-td>
    </template>
    <template #body='props'>
      <q-tr :props="props">
      <q-td :props="props" key='id'>
        {{props.row.id}}
      </q-td>
      <q-td :props="props" key='name'>
        {{props.row.name}}
        <q-popup-edit v-model="props.row.name" title="Edit the name" auto-save v-slot="scope" class="bg-grey-10 text-white" @keyup.enter="save(props.row.id, props.row.name)"  >
              <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" dark color="white" />
            </q-popup-edit>
      </q-td>
      <q-td :props="props" key='image'>
        <q-img :src="props.row.image"
          spinner-color="white"
          style="height: 100px; max-width: 100px; border-radius: 5px"></q-img>
         <q-popup-edit v-model="props.row.image" title="Edit the picture" auto-save v-slot="scope" class="bg-grey-10 text-white">
              <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" dark color="white" />
            </q-popup-edit>
      </q-td>
      </q-tr>
    </template>
    <template #loading>
        <q-inner-loading 
            showing 
            color="grey-8">
        </q-inner-loading>  

    </template>
    </q-table>
</q-page>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
//jj. interfaces
import { Rangeob, St, heroesObj} from '../deftypes/models';
//move post list to transsmission
// import {grabList} from '../transmission/apiserv'

export default defineComponent({
  name: 'RamList',
  
  setup() {

    const loading = ref(true) 
    
    const heroes = ref<heroesObj[]>([])

    let heroesDplay = ref<heroesObj[]>([])

    const pagination = ref({
        rowsPerPage: 5,
    })

    //jj. my simple variable test
    let search = ref<St>('')

    //jj. define this type Jan 
    const columns = ref([
        {
            name: 'id',
            label: 'Id',
            field: 'id',
            align: 'left'
        },
        {
            name: 'name',
            label: 'Name',
            field: 'name',
            align: 'left'
        },
        {
            name: 'image',
            label: 'Picture',
            field: 'image',
            align: 'center'
        }   
    ]);
     let snap = ref<Rangeob>(
      {
        min: 0,
        max: 100
      }
    );

    //jj. filter by range handler
    const onFilters = ():void => {
        heroesDplay.value = heroes.value.filter(el => {return el.id> snap.value.min && el.id <= snap.value.max && el.name.toLowerCase().includes(search.value.toLowerCase())})

        //jj. this is  code part to consider it change range bar depend on search input probably dead path

        // let miniMax = [];
        // for(let i = 0; i<heroesDplay.value.length; i++){
        // miniMax.push(heroesDplay.value[i].id)
        // }
        // snap.value.max = Math.max(...miniMax)
        // snap.value.min = Math.min(...miniMax)
    }


    //jj. this is function taht saveing edited cell and sending to server
    const save = (id : number, name: string ):void => {
        console.log(id, name)
        for(let i = 0; i < heroes.value.length; i++){
            //console.log(heroes.value[i].name);
             if(heroes.value[i].id == id){
                console.log(heroes.value[i], name)
            //     el.name=name
            }

        }
        axios.post('http://localhost:3333/api/uplist/listen', heroes.value) 
    
    }

    //jj. On mounted for fill the grid
    onMounted(async () => {
        console.log('hello nice to meet you');
        await axios.post('http://localhost:3333/api/heroes/list')
        .then(res => {
        heroes.value = res.data;
        heroesDplay.value = res.data;
        console.log(res)
        }).catch(err=>{alert(err.message);}).finally(()=>{
        loading.value = false;
        })
    })
    return {
        loading,
        heroesDplay,
        columns,
        pagination,
        snap,
        search,
        onFilters,
        save
     };
  },
});
</script>

<style>
.bg-brand {
  background-image: url(../assets/rnmfigures.svg);
  background-repeat: no-repeat;
  background-position: center;
  background-color: black;
  color: white;
}
.q-table--dark tbody td:before {
    background: rgba(22, 138, 247, 0.082);
}

/* .image {
    background-image: url(../assets/rmlogo-01.png);
    background-size: contain;
  } */

</style>