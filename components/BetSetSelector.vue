<template>
    <div class="relative flex flex-col items-center" >
        <p class="cursor-pointer" @click="toggleMenum">套路{{ setValue }}</p>
        <ul class="p-2 absolute z-[10] top-[25px] bg-black text-white w-full" v-show="showMenum">
            <li class="w-full hover:bg-slate-700" v-for="value in setValues" :key="value" @click="setSetValue(value)">
                {{ value }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    setNumber:number | string,
    setValues:number | string[] 
}>()
const { toggleMenum, showMenum } = useWatchClickOutSide()
const setValue = ref<number | string >('A')

function setSetValue(value:number | string){
    setValue.value = value
    toggleMenum()
}

</script>