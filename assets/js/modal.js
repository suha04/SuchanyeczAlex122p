//modal funkciók

// Function to open the specified modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
    document.body.classList.add('modal-open'); // Add class to lock scrolling
}

// Function to close the specified modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
    document.body.classList.remove('modal-open'); // Remove class to unlock scrolling
}

// Get references to the buttons
const openModalBtn1 = document.getElementById('cskod');

// When the user clicks the first button, display Modal 1
openModalBtn1.addEventListener('click', () => {
    openModal('myModal1');
});

// Get the close buttons inside the pop-ups
const closeBtns = document.querySelectorAll('.close');

// Add event listeners to close the modals when the close button is clicked
closeBtns.forEach((closeBtn) => {
    closeBtn.addEventListener('click', () => {
        const modalId = closeBtn.parentNode.parentNode.id;
        closeModal(modalId);
    });
});

// Add event listener to close the modals when clicking outside the pop-up
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        const modalId = event.target.id;
        closeModal(modalId);
    }
});


//c# kód funkciók


//c# kód szöveg

var cSharpSzoveg = 
`using System;

class Program
{
    static void Main(string[] args)
    {
        int[] oldalszamok = new int[9];
        Random rnd = new Random();

        // Generáljuk a véletlen oldalszámokat és tároljuk őket a tömbben
        for (int i = 0; i < oldalszamok.Length; i++)
        {
            oldalszamok[i] = rnd.Next(100, 201); // 100-200 közötti véletlen szám generálása
        }

        Console.WriteLine("Eredeti sorrendben:");
        PrintArray(oldalszamok);

        InsertionSort(oldalszamok);

        Console.WriteLine("\nRendezetten:");
        PrintArray(oldalszamok);
    }

    // Beszúrásos rendezés algoritmus implementációja
    static void InsertionSort(int[] arr)
    {
        for (int i = 1; i < arr.Length; i++)
        {
            int current = arr[i];
            int j = i - 1;

            while (j >= 0 && arr[j] > current)
            {
                arr[j + 1] = arr[j];
                j--;
            }

            arr[j + 1] = current;
        }
    }

    // Tömb kiíratása
    static void PrintArray(int[] arr)
    {
        foreach (var item in arr)
        {
            Console.Write(item + " ");
        }
        Console.WriteLine();
    }
}`;

//c# kód bemásolása szövegként

document.getElementById('input').textContent = cSharpSzoveg;


//c# kód futtatás szimuláció (JS alternatíva)
function main() {
    const oldalszamok = new Array(9);

    // Generáljuk a véletlen oldalszámokat és tároljuk őket a tömbben
    for (let i = 0; i < oldalszamok.length; i++) {
        oldalszamok[i] = getRandomInt(100, 201); // 100-200 közötti véletlen szám generálása
    }

    addToOutput("Eredeti sorrendben:<br>");
    printArray(oldalszamok);

    insertionSort(oldalszamok);

    addToOutput("<br>Rendezetten:<br>");
    printArray(oldalszamok);
}

// Beszúrásos rendezés algoritmus implementációja
function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let current = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = current;
    }
}

// Tömb kiíratása
function printArray(arr) {
    arr.forEach(item => {
        addToOutput(item + " ");
    });
    addToOutput("<br>");
}

// Segédfüggvény a véletlen számok generálásához
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper function to add text to the output element
function addToOutput(text) {
    document.getElementById("output").innerHTML += text;
}

main();


//másolás gomb

document.addEventListener("DOMContentLoaded", function() {
    const textContainer = document.getElementById('input');
    const copyButton = document.getElementById('masolas');
  
    // Fetching the .cs file
    fetch('../assets/csharp/programkodC.cs')
      .then(response => response.text())
      .then(data => {
        // Injecting the content into the HTML div
        textContainer.textContent = data;
      })
      .catch(error => console.error('Error fetching .cs file:', error));
  
    // Copy text to clipboard when button is clicked
    copyButton.textContent = 'Másolás';
    copyButton.addEventListener('click', function() {
      // Select the text within the text container
      const range = document.createRange();
      range.selectNode(textContainer);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
  
      // Copy the selected text to clipboard
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
  
      // Optionally, provide feedback to the user
      copyButton.textContent = 'Másolva!';
      copyButton.style.backgroundColor ="Green";
      setTimeout(() => {
        copyButton.textContent = 'Másolás';
        copyButton.style.backgroundColor ="Grey";
      }, 1500); // Reset button text after 1.5 seconds
    });
  });