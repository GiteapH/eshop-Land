<template>
    <el-autocomplete :fetch-suggestions="querySearch" clearable @select="handleSelect" v-model="input"
        placeholder="请输入搜索商品" class="input-with-select" size="large">
        <template #append>
            <el-button style="background:#ff7800;border-radius: 0px;" size="large" @click="search">
                <el-icon style="vertical-align: middle;">
                    <Search />
                </el-icon>
            </el-button>
        </template>
    </el-autocomplete>
</template>
  
<script>
import { ref, defineComponent } from 'vue'
import { Search } from '@element-plus/icons-vue'
import {get} from '../utils/tools'
export default defineComponent({
    components: {
        Search
    },
    data() {
        return {
            restaurants: [],
        };
    },
    methods: {
        search() {
            let url = window.location.href
            if(url.indexOf('search')!=-1)
                this.$emit('search', this.input);
            else
                this.$router.push('/search/'+this.input)

        },
        querySearch(queryString, cb) {
            let res = queryString
                ? this.restaurants.filter(this.createFilter(queryString))
                : this.restaurants
            // call callback function to return suggestions
            cb(res)

        },
        createFilter(queryString) {
            return (restaurant) => {
                return (
                    restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
                )
            }
        },
        loadAll() {
            let ret = []
            get('/api/search/keyword').then(res=>{
                let datas = res.data.data
                for(let data of datas) {
                    ret.push({
                        value: data+"🔥"
                    })
                }
            })
            return ret
        }
    },
    mounted() {
        this.restaurants = this.loadAll()
    },
    setup() {
        const input = ref('')
        return {
            input
        }
    }
})
</script>
  
<style>
.input-with-select .el-input-group__prepend {
    background-color: var(--el-fill-color-blank);
}
</style>
  