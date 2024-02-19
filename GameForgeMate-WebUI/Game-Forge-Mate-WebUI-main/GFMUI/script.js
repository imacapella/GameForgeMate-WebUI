// Seçili kartları takip etmek için bir dizi kullanın
var selectedCards = [];

function toggleCardSelection(card) {
    // Kartın seçilip seçilmediğini kontrol et
    var isSelected = card.classList.toggle('selected');

    // Seçiliyse kartı diziye ekleyin, değilse çıkarın
    if (isSelected) {
        selectedCards.push(card);
    } else {
        var index = selectedCards.indexOf(card);
        if (index !== -1) {
            selectedCards.splice(index, 1);
        }
    }

    // Seçili kartların bilgilerini göster
    showCardsInfo();
}

function removeSelectedCard(index) {
    // Belirtilen indexteki kartı seçili kartlardan çıkar
    if (index >= 0 && index < selectedCards.length) {
        var removedCard = selectedCards.splice(index, 1)[0];
        removedCard.classList.remove('selected');

        // Seçili kartların bilgilerini güncelle
        showCardsInfo();
    }
}

function showCardsInfo() {
    // Bilgiyi temizle
    var selectedGamesList = document.getElementById('selectedGamesList');
    selectedGamesList.innerHTML = '';

    // Seçili kartların bilgilerini al ve göster
    for (var i = 0; i < selectedCards.length; i++) {
        var card = selectedCards[i];
        var cardTitle = card.querySelector('.gameInfo').innerText;

        // Yeni bir liste öğesi oluşturun
        var listItem = document.createElement('li');
        listItem.innerText = cardTitle;

        // Listeye ekleyin
        selectedGamesList.appendChild(listItem);
    }

}

function sendCardsToApi(){
    // API endpoint
    document.getElementById('sendButton').addEventListener('click', sendCardsToApi);
    const apiEndpoint = 'http://127.0.0.1:5001/get';

    // selectedCards dizisindeki kartları işle
    const payload = selectedCards.map(card => {
        // Burada, kartı temsil eden veriyi uygun formata dönüştürün
        // Örneğin:
        return { cardId: card.id, cardTitle: card.querySelector('.gameInfo').innerText };
    });

    // API'ye POST isteği gönder
    fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}




