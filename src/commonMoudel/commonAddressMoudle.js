import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { computed,ref } from 'vue'
import { get } from '../utils/request'


export const AddressListMoudle = () => {
    
    const router = useRouter()
    const addressList = ref([])
    const getExistAddressList = async () => {
        const result = await get("api/address");
        if (result?.data?.errno === 0) {
            addressList.value = result.data.data
            
        }     
    };
    getExistAddressList()

    const handelClickBack = () => {
        router.back()
    }

    const useAddressEffect = () => {
       
        const currentAddress = computed(() => {
            const store = useStore()
            const addressList = store.state.addressList||[]
            //console.log(addressList)
            return addressList || {}
        })
        return currentAddress
    }



    return { getExistAddressList, handelClickBack, useAddressEffect,addressList }

};



