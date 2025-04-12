import tkinter as tk
from tkinter import ttk
from PIL import Image, ImageTk
import subprocess

class WelcomeScreen:
    def __init__(self, root):
        self.root = root
        self.root.title("Welcome")
        self.root.geometry("500x400")
        self.root.resizable(False, False)

        self.selected_language = tk.StringVar(value="English")

        # ===== Load and set background image =====
        try:
            bg_image = Image.open("welcome_bg.png")
            bg_image = bg_image.resize((500, 400))
            self.bg_photo = ImageTk.PhotoImage(bg_image)
            self.bg_label = tk.Label(self.root, image=self.bg_photo)
            self.bg_label.place(x=0, y=0, relwidth=1, relheight=1)
        except:
            self.root.configure(bg="#e0f7fa")

        # ===== Hospital Title =====
        self.title_label = tk.Label(root, text="ADICHUNCHANAGIRI HOSPITAL", font=("Arial", 20, "bold"),
                                    fg="#004d40")
        self.title_label.place(relx=0.5, y=30, anchor="center")

        # ===== Slogan =====
        self.slogan_label = tk.Label(root, text="Jai Shree Guru Dev", font=("Arial", 12, "italic"),
                                     fg="#3e3e3e")
        self.slogan_label.place(relx=0.5, y=55, anchor="center")

        # ===== Health Tip =====
        self.tip_label = tk.Label(root, text="💡 Health Tip: Drink plenty of water daily!", font=("Arial", 12),
                                  fg="#00695c")
        self.tip_label.place(relx=0.5, y=90, anchor="center")

        # ===== Language Selection =====
        self.lang_label = tk.Label(root, text="Select Language:", font=("Arial", 12))
        self.lang_label.place(relx=0.5, y=130, anchor="center")

        langs = ["English", "Kannada", "Hindi"]
        for i, lang in enumerate(langs):
            ttk.Radiobutton(root, text=lang, variable=self.selected_language, value=lang).place(relx=0.5, y=160 + i * 30, anchor="center")

        # ===== Next Button =====
        self.next_button = tk.Button(root, text="Next", command=self.go_to_patient_details,
                                     bg="#00796b", fg="white", font=("Arial", 12, "bold"))
        self.next_button.place(relx=0.5, y=280, anchor="center")

        # ===== Doctor Login Button (Smaller Font) =====
        self.doctor_login_btn = tk.Button(root, text="Doctor Login", command=self.go_to_doctor_login,
                                          bg="#6a1b9a", fg="white", font=("Arial", 9))
        self.doctor_login_btn.place(relx=0.5, y=320, anchor="center")

        # ===== Left Bottom Logo (logo.png) =====
        try:
            logo_image_left = Image.open("logo.png")
            logo_image_left = logo_image_left.resize((60, 60))
            self.logo_photo_left = ImageTk.PhotoImage(logo_image_left)
            self.logo_label_left = tk.Label(self.root, image=self.logo_photo_left)
            self.logo_label_left.place(x=10, y=330)
        except:
            pass

        # ===== Right Bottom Logo (logo_right.png) =====
        try:
            logo_image_right = Image.open("logo_right.png")
            logo_image_right = logo_image_right.resize((60, 60))
            self.logo_photo_right = ImageTk.PhotoImage(logo_image_right)
            self.logo_label_right = tk.Label(self.root, image=self.logo_photo_right)
            self.logo_label_right.place(x=430, y=330)
        except:
            pass

    def go_to_patient_details(self):
        lang = self.selected_language.get()
        self.root.destroy()
        subprocess.run(["python", "patient_details.py", lang])

    def go_to_doctor_login(self):
        self.root.destroy()
        subprocess.run(["python", "doctor_login.py"])

if __name__ == "__main__":
    root = tk.Tk()
    app = WelcomeScreen(root)
    root.mainloop()
