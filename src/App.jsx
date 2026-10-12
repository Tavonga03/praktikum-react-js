import { useState } from 'react'
import ItemTugas from './ItemTugas'

// ---------- Tugas 1: Profil ----------
const nama = '  TAVONGA JOHN JUNIOR GWENHURE'
const nim = '255314082'
const programStudi = 'Teknik Informatika'

function BarisProfil({ label, nilai }) {
  return (
    <p>
      <strong>{label}:</strong> {nilai}
    </p>
  )
}

function Profil() {
  return (
    <section id="profil">
      <h2>Tugas 1: Profil Mahasiswa</h2>
      <div className="card">
        <BarisProfil label="Nama" nilai={nama} />
        <BarisProfil label="NIM" nilai={nim} />
        <BarisProfil label="Program Studi" nilai={programStudi} />
      </div>
    </section>
  )
}

// ---------- Tugas 2: Daftar Mata Kuliah ----------
const daftarMatkul = [
  { id: 1, nama: 'Pemrograman Web', sks: 3 },
  { id: 2, nama: 'Struktur Data', sks: 3 },
  { id: 3, nama: 'Sistem Operasi', sks: 3 },
  { id: 4, nama: 'Basis Data', sks: 3 },
]

function KartuMatkul({ namaMatkul, sks }) {
  return (
    <div className="card">
      <h3>{namaMatkul}</h3>
      <p>{sks} SKS</p>
    </div>
  )
}

function DaftarMatkul() {
  return (
    <section id="matkul">
      <h2>Tugas 2: Daftar Mata Kuliah</h2>
      <div className="grid">
        {daftarMatkul.map((m) => (
          <KartuMatkul key={m.id} namaMatkul={m.nama} sks={m.sks} />
        ))}
      </div>
    </section>
  )
}

// ---------- Tugas 3: Penghitung Kehadiran ----------
function Kehadiran() {
  const [jumlah, setJumlah] = useState(0)

  function tambah() {
    if (jumlah < 30) setJumlah(jumlah + 1)
  }

  function kurang() {
    if (jumlah > 0) setJumlah(jumlah - 1)
  }

  return (
    <section id="kehadiran">
      <h2>Tugas 3: Penghitung Kehadiran</h2>
      <div className="card center">
        <p className="angka">{jumlah}</p>
        <p>Batas: 0 sampai 30</p>
        <button onClick={tambah} disabled={jumlah === 30}>
          Tambah
        </button>{' '}
        <button onClick={kurang} disabled={jumlah === 0}>
          Kurang
        </button>{' '}
        <button onClick={() => setJumlah(0)}>Reset</button>
      </div>
    </section>
  )
}

// ---------- Tugas 4: Daftar Tugas Kuliah ----------
function DaftarTugas() {
  const [tugas, setTugas] = useState([])
  const [judulBaru, setJudulBaru] = useState('')
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('semua')

  function tambahTugas(e) {
    e.preventDefault() // supaya halaman tidak reload

    if (judulBaru.trim() === '') {
      setError('Judul tugas tidak boleh kosong.')
      return
    }

    const tugasBaru = {
      id: Date.now(), // ID unik
      judul: judulBaru.trim(),
      selesai: false,
    }

    setTugas([...tugas, tugasBaru]) // spread: array baru
    setJudulBaru('')
    setError('')
  }

  function toggleTugas(id) {
    setTugas(
      tugas.map((t) => (t.id === id ? { ...t, selesai: !t.selesai } : t))
    )
  }

  function hapusTugas(id) {
    setTugas(tugas.filter((t) => t.id !== id))
  }

  // Filter hanya mengubah tampilan, data "tugas" tidak berubah
  let tugasTampil = tugas
  if (filter === 'aktif') {
    tugasTampil = tugas.filter((t) => !t.selesai)
  } else if (filter === 'selesai') {
    tugasTampil = tugas.filter((t) => t.selesai)
  }

  const jumlahSelesai = tugas.filter((t) => t.selesai).length

  return (
    <section id="tugas">
      <h2>Tugas 4: Daftar Tugas Kuliah</h2>
      <div className="card">
        <h3>Daftar Tugas Kuliah</h3>

        <form onSubmit={tambahTugas}>
          <label htmlFor="judul">Tugas baru</label>
          <input
            id="judul"
            type="text"
            value={judulBaru}
            onChange={(e) => setJudulBaru(e.target.value)}
            placeholder="Contoh: Kerjakan laporan"
          />
          <button type="submit">Tambah</button>
          {error && <p className="error">{error}</p>}
        </form>

        <p>
          {jumlahSelesai} dari {tugas.length} tugas selesai
        </p>

        <div className="filter">
          <button
            className={filter === 'semua' ? 'aktif' : ''}
            onClick={() => setFilter('semua')}
          >
            Semua
          </button>{' '}
          <button
            className={filter === 'aktif' ? 'aktif' : ''}
            onClick={() => setFilter('aktif')}
          >
            Aktif
          </button>{' '}
          <button
            className={filter === 'selesai' ? 'aktif' : ''}
            onClick={() => setFilter('selesai')}
          >
            Selesai
          </button>
        </div>

        {tugasTampil.length === 0 ? (
          <p className="kosong">
            {tugas.length === 0
              ? 'Belum ada tugas. Tambahkan tugas pertamamu!'
              : 'Tidak ada tugas pada filter ini.'}
          </p>
        ) : (
          <ul className="daftar">
            {tugasTampil.map((t) => (
              <ItemTugas
                key={t.id}
                tugas={t}
                onToggle={toggleTugas}
                onHapus={hapusTugas}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

// ---------- Halaman utama ----------
function App() {
  return (
    <>
      <nav className="nav">
        <a href="#profil">Profil</a>
        <a href="#matkul">Mata Kuliah</a>
        <a href="#kehadiran">Kehadiran</a>
        <a href="#tugas">Daftar Tugas</a>
      </nav>

      <main className="container">
        <h1>Praktikum React JS</h1>
        <Profil />
        <DaftarMatkul />
        <Kehadiran />
        <DaftarTugas />
      </main>
    </>
  )
}

export default App