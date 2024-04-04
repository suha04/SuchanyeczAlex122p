using System;

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
}