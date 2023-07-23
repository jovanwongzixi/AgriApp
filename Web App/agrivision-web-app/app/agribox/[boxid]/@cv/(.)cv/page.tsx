import Modal from '@/app/components/modal/Modal'
import ComputerVision from '@/app/components/agribox/ComputerVision'

export default function Page(){
    return(
        // <div className='fixed top-0 left-0 bg-white z-[1055] h-[40%] w-[40%] overflow-y-auto overflow-x-hidden outline-none'></div>
        <Modal>
            <ComputerVision />
        </Modal>
    )
}