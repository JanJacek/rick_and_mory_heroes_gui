<template>
<q-page class="q-ma-xl">
    <q-table
        :loading="loading"
        :rows="heroesDplay"
        title="Rick And Morty character list"
        class="q-pa-md bg-grey-10 text-white"
        :columns="columns"
        separator="none"
        :pagination="pagination"
    >
    <template #top-row>
        <q-td style="display:block">
        <q-badge color="grey-8">
        Chose range: {{ 1 }} to {{ heroesDplay.length }}
        </q-badge>
        <div>
            <!-- jj place for range filter -->
            <q-range
                v-model="snap"
                :min="0"
                :max="heroesDplay.length"
                :step="1"
                label
                snap
                @update:model-value="printThis()" 
            ></q-range>
        </div>
        </q-td>
        <q-td>
            <!-- jj search filter -->
            <q-input  
                dense debounce="400" 
                v-model="search" 
                dark color="white" 
                label="Znajdź bohatera"
                @update:model-value="onSearch()" 
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
        <q-popup-edit v-model="props.row.id" title="Edit the number" auto-save v-slot="scope" class="bg-grey-10 text-white">
              <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" dark color="white" />
            </q-popup-edit>
      </q-td>
      <q-td :props="props" key='name'>
        {{props.row.name}}
        <q-popup-edit v-model="props.row.name" title="Edit the number" auto-save v-slot="scope" class="bg-grey-10 text-white">
              <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" dark color="white" />
            </q-popup-edit>
      </q-td>
      <q-td :props="props" key='image'>
        <q-img :src="props.row.image"
          spinner-color="white"
          style="height: 100px; max-width: 100px; border-radius: 5px"></q-img>
         <q-popup-edit v-model="props.row.image" title="Edit the number" auto-save v-slot="scope" class="bg-grey-10 text-white">
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
import { defineComponent, ref, onMounted} from 'vue';
import axios from 'axios';
//jj. interfaces
import { Rangeob, St} from '../deftypes/models';
//import { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } from 'constants';

export default defineComponent({
  name: 'RamList',
  
  setup() {

    const loading = ref(true) 
    
    const heroes = ref([])

    let heroesDplay = ref([])

    const pagination = ref([{
        page:5,
        rowsPerPage: 20,
        rowsNumber:  100,
    }])

    //jj. my simple variable test
    let search = ref<St>(null)

    //jj. define this type Jan 
    const columns = [
        {
            name: 'id',
            label: 'Id',
            field: 'id',
            align: 'left'
        },
        {
            name: 'name',
            label: 'Imię i nazwisko',
            field: 'name',
            align: 'left'
        },
        {
            name: 'image',
            label: 'Zdjęcie',
            field: 'image',
            align: 'center'
        }
    ];
     let snap = ref<Rangeob>(
      {
        min: 1,
        max: 2
      }
    );

    //jj. filter by range handler
    const printThis = ():void => {
        console.log(snap.value);
        console.log(heroes.value.filter(el=> el.id <= snap.value.max && el.id >=  snap.value.min ))
        heroesDplay.value = heroes.value.filter(el=> el.id <= snap.value.max )
        heroesDplay.value = heroes.value.filter(el=> el.id >= snap.value.min )
    }

    //jj. filter by searcz input
    const onSearch = (): void => {
        heroesDplay.value = heroes.value.filter(el=> el.name.toLowerCase().includes(search.value.toLowerCase()))
    };

    const fetchRaM = () => {
        axios.get('http://localhost:3333/heroes')
        .then(res => {
        heroes.value = res.data.results;
        heroesDplay.value = res.data.results;
        })
        .finally(()=>{
        loading.value = false;
        })
    };
    fetchRaM();

    onMounted(() => {
        console.log('hello nice to meet you');
    });

    return {
        loading,
        heroesDplay,
        columns,
        pagination,
        snap,
        search,
        onSearch,
        printThis
     };
  },
});
</script>
