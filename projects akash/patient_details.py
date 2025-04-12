import tkinter as tk
from tkinter import ttk, messagebox
import subprocess
import datetime
import openpyxl
import os
import sys

class PatientDetails:
    def __init__(self, root, language):
        self.root = root
        self.language = language
        self.root.title("Patient Details")
        self.root.geometry("500x600")
        self.root.configure(bg="#f1f8e9")

        self.language_labels = {
            "English": {
                "name": "Name", "phone": "Phone Number", "location": "Location", "age": "Age",
                "next": "Next", "back": "Back"
            },
            "Kannada": {
                "name": "ಹೆಸರು", "phone": "ದೂರವಾಣಿ ಸಂಖ್ಯೆ", "location": "ಸ್ಥಳ", "age": "ವಯಸ್ಸು",
                "next": "ಮುಂದೆ", "back": "ಹಿಂದೆ"
            },
            "Hindi": {
                "name": "नाम", "phone": "फ़ोन नंबर", "location": "स्थान", "age": "उम्र",
                "next": "आगे", "back": "वापस"
            }
        }

        self.entries = {}
        self.label_widgets = {}

        tk.Label(root, text=self.get_title(), font=("Arial", 16, "bold"), bg="#f1f8e9", fg="#33691e").pack(pady=20)

        form_frame = tk.Frame(root, bg="#f1f8e9")
        form_frame.pack()

        for field in ["name", "phone", "location", "age"]:
            label = tk.Label(form_frame, text="", font=("Arial", 12), bg="#f1f8e9")
            entry = tk.Entry(form_frame, font=("Arial", 12), width=30)
            label.pack(pady=5)
            entry.pack(pady=5)
            self.label_widgets[field] = label
            self.entries[field] = entry

        # ===== Buttons Frame =====
        button_frame = tk.Frame(root, bg="#f1f8e9")
        button_frame.pack(pady=30)

        self.back_btn = tk.Button(button_frame, text="", command=self.go_back, bg="#c62828", fg="white", font=("Arial", 12, "bold"))
        self.back_btn.pack(side="left", padx=10)

        self.next_btn = tk.Button(button_frame, text="", command=self.save_and_next, bg="#689f38", fg="white", font=("Arial", 12, "bold"))
        self.next_btn.pack(side="right", padx=10)

        self.update_labels()

    def get_title(self):
        return {
            "English": "Enter Patient Details",
            "Kannada": "ರೋಗಿಯ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ",
            "Hindi": "रोगी का विवरण दर्ज करें"
        }.get(self.language, "Enter Patient Details")

    def update_labels(self):
        labels = self.language_labels[self.language]
        for key, label_widget in self.label_widgets.items():
            label_widget.config(text=labels[key])
        self.next_btn.config(text=labels["next"])
        self.back_btn.config(text=labels["back"])

    def save_and_next(self):
        data = {field: self.entries[field].get().strip() for field in self.entries}

        if not all(data.values()):
            messagebox.showerror("Error", "Please fill in all fields.")
            return

        now = datetime.datetime.now()
        data_row = [
            now.strftime("%Y-%m-%d"),
            now.strftime("%H:%M:%S"),
            now.strftime("%A"),
            now.strftime("%B"),
            data["name"],
            data["phone"],
            data["location"],
            data["age"],
            self.language
        ]

        file_name = "patient_data.xlsx"
        if not os.path.exists(file_name):
            wb = openpyxl.Workbook()
            sheet = wb.active
            sheet.append(["Date", "Time", "Day", "Month", "Name", "Phone", "Location", "Age", "Language"])
            wb.save(file_name)

        wb = openpyxl.load_workbook(file_name)
        sheet = wb.active
        sheet.append(data_row)
        wb.save(file_name)

        self.root.destroy()
        # ✅ FIX: Pass name and phone number to next screen
        subprocess.run(["python", "disease_selection.py", self.language, data["name"], data["phone"]])

    def go_back(self):
        self.root.destroy()
        subprocess.run(["python", "welcome_screen.py"])

if __name__ == "__main__":
    language = sys.argv[1] if len(sys.argv) > 1 else "English"
    root = tk.Tk()
    app = PatientDetails(root, language)
    root.mainloop()
