from postmarker.core import PostmarkClient
from django.conf import settings

def send_email(subject, message, to_email):
    postmark = PostmarkClient(server_token=settings.POSTMARK_API_KEY)
    response = postmark.emails.send(
        From=settings.DEFAULT_FROM_EMAIL,
        To=to_email,
        Subject=subject,
        HtmlBody=message,
    )
    return response