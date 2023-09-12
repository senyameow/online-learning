import { Store } from '@prisma/client';
import { create } from 'zustand'

export type ModalType = 'createStore' | 'deleteStore' | 'createBillboard'

interface ModalData {
    store?: Store;
    storeId?: string;
    storeName?: string;
    apiUrl?: string;
    query?: Record<string, any>;
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

