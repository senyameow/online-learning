import { BillboardColumn } from '@/app/(dashboard)/[storeId]/(routes)/billboards/components/columns';
import { CategoryColumn } from '@/app/(dashboard)/[storeId]/(routes)/categories/components/columns';
import { ColorsColumn } from '@/app/(dashboard)/[storeId]/(routes)/colors/components/columns';
import { ProductColumn } from '@/app/(dashboard)/[storeId]/(routes)/products/components/columns';
import { SizesColumn } from '@/app/(dashboard)/[storeId]/(routes)/sizes/components/columns';
import { Billboard, Store } from '@prisma/client';
import { create } from 'zustand'

export type ModalType = 'createStore' | 'deleteStore' | 'createBillboard' | 'updateBillboard' | 'updateCategory' | 'createCategory' | 'createSize' | 'updateSize' | 'createColor' | 'updateColor' | 'createProduct' | 'updateProduct'

interface ModalData {
    store?: Store;
    storeId?: string;
    storeName?: string;
    apiUrl?: string;
    query?: Record<string, any>;
    billboard?: BillboardColumn;
    billboardsByStoreId?: Billboard[]
    category?: CategoryColumn;
    size?: SizesColumn;
    color?: ColorsColumn;
    product?: ProductColumn;
}

interface ModalStoreProps {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModalStore = create<ModalStoreProps>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ isOpen: true, type: type, data }),
    onClose: () => set({ isOpen: false, type: null, data: {} }),
}))

