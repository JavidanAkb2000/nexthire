from pathlib import Path
from pypdf import PdfReader
from pypdf.errors import PdfReadError
import io
import sys

# We define paths beforehand
CURRENT_FILE_PATH = Path(__file__).resolve()
PATH_TO_RESUME = CURRENT_FILE_PATH.parent.parent / "resume" / "resume.pdf"

def extract_text_from_pdf(file_bytest: bytes) -> str:
    """Extract text from PDF file bytes securely"""
    try:
        reader = PdfReader(io.BytesIO(file_bytest))
        text = []

        # If the page does not exist, or it's broken, then we will catch that error.
        for page in reader.pages:
            page_text = page.extract_text()
            if  page_text:
                text.append(page_text)

        return "\n".join(text).strip()

    except PdfReadError:
        print('Error: PDF file is either broken or not readable.')
        return ""
    except Exception as e:
        print(f'Unexpected error (PDF): {e}')
        return ""


def get_resume_content(path: Path) -> str:
    """It opens the file via a path securely and returns the file"""

    # We check if the file path exists
    if not path.exists():
        print(f'Error: {path} does not exist.')
        return ""

    # We check whether it is the file or not (it may be a folder as well, so we have to make sure).
    if not path.is_file():
        print(f'Error: {path} is not a file.')
        return ""

    try:
        # `with` clause makes sure the file is closed automatically.
        with open(path, 'rb') as file:
            pdf_content = file.read()
            return extract_text_from_pdf(pdf_content)

    except PermissionError:
        print(f"No permission to access {path}.")
    except Exception as e:
        print(f'Unexpected error (PDF): {e}')




if __name__ == "__main__":
    # testing
    content = get_resume_content(PATH_TO_RESUME)

    if content:
        print("Content is extracted succesfully:")
        print(content[:500] + "...")  # The very first 500 characters
        print(f"\nType: {type(content)}")
    else:
        print("Extraction failed.")
        sys.exit(1)  # We end the program with an error code
