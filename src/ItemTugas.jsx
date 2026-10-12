function ItemTugas({ tugas, onToggle, onHapus }) {
    return (
        <li className={tugas.selesai ? 'item selesai' : 'item'}>
            <span>{tugas.judul}</span>
            <span>
                <button onClick={() => onToggle(tugas.id)}>
                    {tugas.selesai ? 'Aktifkan lagi' : 'Tandai selesai'}
                </button>{' '}
                <button onClick={() => onHapus(tugas.id)}>Hapus</button>
            </span>
        </li>
    )
}

export default ItemTugas