from postmarker.core import PostmarkClient
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

def send_email(subject, message, to_email):
    try:
        # Initialize Postmark client
        postmark = PostmarkClient(server_token=settings.POSTMARK['TOKEN'])
        
        # Create plain text version of the message
        plain_text = message.replace('<br>', '\n').replace('</p>', '\n\n')
        plain_text = plain_text.replace('<h2>', '\n\n').replace('</h2>', '\n\n')
        plain_text = plain_text.replace('<h3>', '\n\n').replace('</h3>', '\n\n')
        plain_text = plain_text.replace('<p>', '').replace('</p>', '\n\n')
        plain_text = plain_text.replace('<html>', '').replace('</html>', '')
        plain_text = plain_text.replace('<body>', '').replace('</body>', '')
        
        # Send email
        response = postmark.emails.send(
            From=settings.DEFAULT_FROM_EMAIL,
            To=to_email,
            Subject=subject,
            HtmlBody=message,
            TextBody=plain_text,
            MessageStream='outbound'
        )
        
        logger.info(f"Email sent successfully to {to_email}")
        return response
    except Exception as e:
        logger.error(f"Failed to send email to {to_email}: {str(e)}")
        raise