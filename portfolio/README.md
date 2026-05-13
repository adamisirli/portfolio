# Ada Mısırlı Kişisel Portfolyo

Bu proje Ada Mısırlı için hazırlanmış statik kişisel portfolyo web sitesidir. Site; hakkımda, deneyim, projeler, beceriler, iletişim ve CV bağlantıları gibi bölümleri içerir.

## Kullanılan Teknolojiler

- HTML5
- CSS3
- JavaScript
- GitHub Pages uyumlu statik yapı

## Temel Özellikler

- Responsive portfolyo arayüzü
- Ana sayfa ve hakkımda sayfası
- Proje/deneyim bölümleri
- Türkçe ve İngilizce CV bağlantıları
- Mobil menü
- Yerel çalıştırma için yardımcı script ve bat dosyası
- GitHub Pages için `.nojekyll` ve `CNAME` dosyaları

## Dosya Yapısı

- `index.html`: Ana portfolyo sayfası.
- `ben-kimim.html`: Hakkımda sayfası.
- `styles.css`: Stil dosyası.
- `script.js`: Menü ve etkileşim kodları.
- `serve-local.js`: Yerel sunucu ile test için yardımcı dosya.
- `siteyi-ac.bat`: Windows üzerinde siteyi hızlı açmak için bat dosyası.
- `cv/`: Özgeçmiş PDF dosyaları.

## Çalıştırma

En basit yöntem:

1. `index.html` dosyasını tarayıcıda açın.

Yerel sunucu ile çalıştırmak için:

```bash
node serve-local.js
```

## Yayınlama

Proje GitHub Pages üzerinde yayınlanmaya uygundur. Repository ayarlarında Pages bölümünden ana branch ve root klasörü seçilerek yayınlanabilir.
